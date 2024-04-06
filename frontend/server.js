import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import expressLayout from "express-ejs-layouts"
import { config } from 'dotenv';
import bodyParser from "body-parser";

const noLayout = '../views/layouts/nothing.ejs'
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.json())
app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route for '/home' to serve 'home.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});
app.get("/cause", (req, res) => {
  res.render("cause1", {layout: noLayout})
  // res.sendFile(path.join(__dirname, "public", "cause.html"));
});
app.get("/transactions", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "transaction.html"));
});
app.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "terms.html"));
});
app.get("/request_donation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "donation.html"));
});
app.get("/cause-details/:id", (req, res) => {
  let causeId = req.params.id
  console.log(causeId)
  res.render("cause-details1", {layout: noLayout, id: causeId})
  // res.sendFile(path.join(__dirname, "public", "cause-details.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});
app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "donation.html"));
});
app.post('/getDonations', async (req, res) => {
  console.log(req.body)
  const donations = req.body
  // const {} = req.body
  res.render("cause", {layout: noLayout, donations: donations})
  
})

app.post('/singleDonations', async (req, res) => {
  console.log(req.body)
  const donation = req.body
  // const {} = req.body
  res.render("cause-details", {layout: noLayout, donation: donation})
  
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
