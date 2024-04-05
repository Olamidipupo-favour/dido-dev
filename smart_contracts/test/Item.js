// test/ItemRegistry.test.js
const { expect } = require('chai');

describe('ItemRegistry', function () {
    let ItemRegistry;
    let itemRegistry;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        ItemRegistry = await ethers.getContractFactory("ItemRegistry");
        [owner, addr1, addr2] = await ethers.getSigners();

        itemRegistry = await ItemRegistry.deploy();
    });

    it('should add new items', async function () {
        await itemRegistry.connect(owner).addItem('Item1', 100);
        await itemRegistry.connect(addr1).addItem('Item2', 200);

        const items = await itemRegistry.getAllItems();
        expect(items.length).to.equal(2);
        expect(items[0].id).to.equal(0);
        expect(items[0].name).to.equal('Item1');
        expect(items[0].quantity).to.equal(100);
        expect(items[1].id).to.equal(1);
        expect(items[1].name).to.equal('Item2');
        expect(items[1].quantity).to.equal(200);
    });

    it('should retrieve all items', async function () {
        await itemRegistry.connect(owner).addItem('Item1', 100);
        await itemRegistry.connect(addr1).addItem('Item2', 200);

        const items = await itemRegistry.getAllItems();
        console.log(items)
        expect(items.length).to.equal(2);
    });
});
