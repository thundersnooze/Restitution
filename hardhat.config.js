require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "deploys the contract", async(taskArgs, hre) => {

  const Category = await hre.ethers.getContractFactory("Category");
  const category = await Category.deploy("Category Contract", "CAT");

  await category.deployed();

  await hre.run("verify:verify", {
    address: category.address,
    constructorArguments: [
      "Category Contract",
      "CT"
    ]
  })

})

module.exports = {
  solidity: "0.8.2",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        process.env.PRIVATE_KEY,
      ]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY,
  }
};
