
#setting up the connection to the MongoDB Atlas cluster
from pymongo.mongo_client import MongoClient
#dotenv
from dotenv import load_dotenv
import os

# Load the dotenv file
load_dotenv()
uri = f"mongodb+srv://{os.environ.get('user')}:{os.environ.get('password')}@dido.dp4zgv3.mongodb.net/?retryWrites=true&w=majority&appName=dido"

# Create a new client and connect to the server
client = MongoClient(uri)

#setting up flask
from flask import Flask, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport


#setting up app instance 
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['JWT_SECRET_KEY']=os.environ.get('JWT_SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES']=int(os.environ.get('jwt_expiry_time'))
jwt=JWTManager(app)
api = Api(app)

api_endpoint=os.environ.get('api-endpoint')
print(api_endpoint)
transport = AIOHTTPTransport(
   url=api_endpoint
)

gql_client = Client(
   transport=transport,
   fetch_schema_from_transport=True,
)
#setin up API

class Register(Resource):
    def post(self):
        data = request.get_json()
        user=data.get("username")
        password=data.get("password")
        oxadress=data.get("oxadress")
        name=data.get("name")
        if(user and password):
            users = client.dido.users
            if users.find_one({'username':user}):
                return {"message":"User already exists"}, 400
            users.insert_one({'username':user, 'password':generate_password_hash(password),"role":1,"name":name,"oxadress":oxadress})
            return {"message":"User created successfully"}, 201
        return {"message":"Invalid data"}, 400

class Login(Resource):
    def post(self):
        data = request.get_json()
        user=data.get("username")
        password=data.get("password")
        if(user and password):
            users = client.dido.users
            user_data = users.find_one({'username':user})
            if user_data and check_password_hash(user_data['password'],password):
                access_token = create_access_token(identity=user)
                return {"access_token":access_token}, 200
            return {"message":"Invalid credentials"}, 400
        return {"message":"Invalid data"}, 400


class RequestETH(Resource):
    @jwt_required()
    def post(self):
        #title, image, link,address, 
        data = request.get_json()
        title=data.get("title")
        image=data.get("image")
        link=data.get("link")
        address=data.get("address")
        user = get_jwt_identity()
        user=client.dido.users.find_one({'username':user})
        if(user and title and link):
            donations = client.dido.donations
            donations.insert_one({'username':user,'title':title,'image':image,'link':link,'address':address})
            #push data to blockchain
            return {"message":"Donation added successfully"}, 201
        return {"message":"Invalid data or you aren't logged in"}, 400
    
class GetDonations(Resource):
    def get(self):
        subgraph_gql_query= gql(
"""
{
  donates(first: 10) {
    id
    from
    to
    blockNumber
    blockTimestamp
    transactionHash
    amount
  }
}
""")
        donations=gql_client.execute(subgraph_gql_query).get('donates')
        for i in donations:
            #fetch sender name from db
            try:
                i['sender']=client.users.dido.find_one({'oxadress':i['sender']}).get('name')
            except:
                pass
            try:
                i['amount']=str((float(i['amount'])/(10**18)))
            except:
                pass
        return {"donations":donations}, 200   
class IsLoggedIn(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        user=client.dido.users.find_one({'username':user})
        user={"username":user['username'],"name":user['name'],"oxadress":user['oxadress']}
        print(user)
        if(user):
            return {"user":user}, 200
        return {"message":"Invalid data"}, 400

class GetRecipeintsDonations(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        user=client.dido.users.find_one({'username':user})
        user_adress=user['oxadress']
        if(user):
            gql_query= gql(
                """
{
  donates(where: {to: "x"}) {
    id
    from
    to
    blockNumber
    blockTimestamp
    transactionHash
    amount
  }
}
""".replace("x",user_adress))
            donations=gql_client.execute(gql_query)
            print(donations)
            return {"donations":donations}, 200
        return {"message":"Invalid data"}, 400
    
class GetSendersDonations(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        user=client.dido.users.find_one({'username':user})
        user_adress=user['oxadress']
        if(user):
            gql_query= gql(
                """
{
  donates(where: {sender: "x"}) {
    id
    from
    to
    blockNumber
    blockTimestamp
    transactionHash
    amount
  }
}
""".replace("x",user_adress))
            donations=gql_client.execute(gql_query)
            print(donations)
            return {"donations":donations}, 200
        return {"message":"Invalid data"}, 400
#register urls
api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(IsLoggedIn, '/api/ping')
api.add_resource(GetDonations, '/api/all-transactions')
api.add_resource(RequestETH, '/api/request_eth')
api.add_resource(GetRecipeintsDonations, '/api/my-donations-received')
api.add_resource(GetSendersDonations, '/api/my-donations-donated')
#RUN APP
if __name__ == '__main__':
    app.run(debug=True)
