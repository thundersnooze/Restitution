const { expect } = require('chai');
const { ethers } = require("hardhat")

describe("Tests", function() {

    let category;
//before each test we wait for the contract factory to load
    this.beforeEach(async function() {
        const Category = await ethers.getContractFactory("Category");
        category = await Category.deploy("Category Contract", "CT");
    })

    //if the test passes
    it("image minted", async function() {
        [account1] = await ethers.getSigners();

        expect(await category.balanceOf(account1.address)).to.equal(0);
        //the token URI is the overhead folder
        const tokenURI = "https://gateway.pinata.cloud/ipfs/QmXMYdyHGWfrAHxnCXTxx1e9SPqaCy4wUPf9BSH3n8SrNn
        const tx = await category.connect(account1).mint(tokenURI);

        expect(await category.balanceOf(account1.address)).to.equal(1);
    })

    it("tokenURI is set sucessfully", async function() {
        [account1, account2] = await ethers.getSigners();
        const tokenURI_1 = "https://gateway.pinata.cloud/ipfs/QmRRtCm2nHysvDbEqgPL67uSzdGECZjGNYmFFpPh6w4v1M"
       
        const tx1 = await category.connect(account1).mint(tokenURI_1);

        expect(await category.tokenURI(0)).to.equal(tokenURI_1);

    })

})


