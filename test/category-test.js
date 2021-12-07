const { expect } = require('chai');
const { ethers } = require("hardhat")

describe("Tests", function() {

    let category;

    this.beforeEach(async function() {
        const Category = await ethers.getContractFactory("Category");
        category = await Category.deploy("Category Contract", "CT");
    })

    it("NFT is minted successfully", async function() {
        [account1] = await ethers.getSigners();

        expect(await category.balanceOf(account1.address)).to.equal(0);
        //
        const tokenURI = "https://gateway.pinata.cloud/ipfs/QmRRtCm2nHysvDbEqgPL67uSzdGECZjGNYmFFpPh6w4v1M"
        const tx = await category.connect(account1).mint(tokenURI);

        expect(await category.balanceOf(account1.address)).to.equal(1);
    })

    it("tokenURI is set sucessfully", async function() {
        [account1, account2] = await ethers.getSigners();

        const tokenURI_1 = "https://gateway.pinata.cloud/ipfs/QmRRtCm2nHysvDbEqgPL67uSzdGECZjGNYmFFpPh6w4v1M"
        const tokenURI_2 = "https://gateway.pinata.cloud/ipfs/QmZkzC758dyQK65tfzvunA5wg8PFdK8ant8vvnae8XwiUN"

        const tx1 = await category.connect(account1).mint(tokenURI_1);
        const tx2 = await category.connect(account2).mint(tokenURI_2);

        expect(await category.tokenURI(0)).to.equal(tokenURI_1);
        expect(await category.tokenURI(1)).to.equal(tokenURI_2);

    })

})


