require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    "optimism-sepolia": {
      url: "https://sepolia.optimism.io",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
