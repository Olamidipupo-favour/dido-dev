const { expect} = require('chai')
const { ethers } = require('hardhat')
const { int } = require('hardhat/internal/core/params/argumentTypes')

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), "ether")
}

const ether = tokens

describe("Dido", () => {

    let dido, user1, user2, deployer;
    let ID = 0
    let FULLNAME = "Test User"
    let CONTACT = "test@gmail.com"
    let EMAIL = "test@gmail.com"
    let TITLE = "TEST TITLE"
    let DESCRIPTION = "Test description"
    let LINKS = "test1"
    let IMAGESURL = "testImage1"
    let TARGET = tokens(12)
    let RAISED = tokens(0)


    beforeEach(async () => {

        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user1 = accounts[5]
        user2 = accounts[6]


        const Dido = await ethers.getContractFactory("Dido")
        dido = await Dido.deploy()
    })

    it("Donate an amount", async () => {



        await dido.connect(user1).generalDonate({value: tokens(1)})
        await dido.connect(user1).generalDonate({value: tokens(1)})
        await dido.connect(user2).generalDonate({value: tokens(1)})
        await dido.connect(user2).generalDonate({value: tokens(2)})


        expect(await dido.donated(user1.address)).to.eq(tokens(2))

        // make sure it get topdoner
        expect(await dido.topDonor()).to.eq(user2.address)

    })

    it("Post Donations", async () => {
            
        transaction = await dido.connect(user1).postDonation(
            FULLNAME, CONTACT, EMAIL, TITLE, DESCRIPTION, LINKS, IMAGESURL, TARGET, RAISED
        )
        await transaction.wait()

        const donation = await dido.connect(user1).donations(0)

        expect(donation.id).to.eq(0)
        expect(donation.recipient).to.eq(user1.address)
        expect(donation.fullname).to.eq(FULLNAME)
        expect(donation.contact).to.eq(CONTACT)
        expect(donation.email).to.eq(EMAIL)
        expect(donation.title).to.eq(TITLE)
        expect(donation.description).to.eq(DESCRIPTION)
        expect(donation.links).to.eq("test1")
        expect(donation.imagesUrl).to.eq("testImage1")
        expect(donation.target).to.eq(tokens(12))
        expect(donation.raised).to.eq(0)

    })

    it("Donates to a recipient address",  async () => {
        transaction = await dido.connect(user1).postDonation(
            FULLNAME, CONTACT,EMAIL, TITLE, DESCRIPTION, LINKS, IMAGESURL, TARGET, RAISED
        )
        await transaction.wait()

        const donation = await dido.connect(user1).donations(0)

        let balanceBefore = await ethers.provider.getBalance(donation.recipient);
        let balanceBefore2 = await ethers.provider.getBalance(user2.address);

        await dido.connect(user2).donateAddress(ID, tokens(0.9), {value: tokens(1)})
        await dido.connect(user2).generalDonate({value: tokens(2)})
        await dido.connect(user1).generalDonate({value: tokens(6)})
        await dido.connect(user2).donateAddress(ID,  tokens(9.9), {value: tokens(10)})


        const donationc = await dido.connect(user1).donations(0)

        expect(donationc.raised).to.eq(tokens(10.8))


        balanceAfter = await ethers.provider.getBalance(donation.recipient);
        balanceAfter2 = await ethers.provider.getBalance(user2.address);

        expect(balanceAfter).to.be.greaterThan(balanceBefore);
        expect(balanceAfter2).to.be.lessThan(balanceBefore2);

        expect(await dido.donated(user2.address)).to.eq(tokens(12.8))

        expect(await dido.topDonor()).to.eq(user2.address)
        expect(await dido.eachTopDonor(ID)).to.eq(user2.address)


        const donationcs = await dido.connect(user1).donations(0)

        expect(donationcs.completed).to.eq(false)


    })

    it("Approves request of ETH", async () => {


        await dido.connect(user2).generalDonate({value: tokens(2)})

        let balance1 = await ethers.provider.getBalance(user1.address);
        console.log(ethers.formatEther(balance1))

        
        await dido.connect(deployer).approveRequestEth(user1.address, tokens(1))


        let balance = await ethers.provider.getBalance(user1.address);
        console.log(ethers.formatEther(balance))


        // expect(balance)
    })

    it("Check for fee", async () => {
        transaction = await dido.connect(user1).postDonation(
            FULLNAME, CONTACT,EMAIL, TITLE, DESCRIPTION, LINKS, IMAGESURL, TARGET, RAISED
        )
        await transaction.wait()

        await dido.connect(user2).donateAddress(ID,  tokens(1), {value: tokens(1.1)})

        let balance = await ethers.provider.getBalance(user1.address);
        console.log(ethers.formatEther(balance))

        let balance2 = await ethers.provider.getBalance(await dido.getAddress());
        console.log(ethers.formatEther(balance2))

    })

    it("Get All Donations", async () => {

        transaction = await dido.connect(user1).postDonation(
            FULLNAME, CONTACT,EMAIL, TITLE, DESCRIPTION, LINKS, IMAGESURL, TARGET, RAISED
        )
        await transaction.wait()

        transaction = await dido.connect(user1).postDonation(
            FULLNAME, CONTACT,EMAIL, TITLE, DESCRIPTION, LINKS, IMAGESURL, TARGET, RAISEDdid
        )
        await transaction.wait()

        const count = await dido.connect(user1).donationsCount()
        for (let i = 0; i <= count; i++ ){
            const donation = await dido.donations(i)
            console.log(donation.id);
            console.log(donation.description);
        }

    })

    // it("Widraw", async () => {
    //     await safeBox.connect(user1).withdraw()
    //     expect(await safeBox.balanceOf(user1.address)).to.eq(tokens(0))

    // })


})