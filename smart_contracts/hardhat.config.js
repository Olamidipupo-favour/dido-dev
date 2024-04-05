require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    "optimism-sepolia": {
      url: "https://sepolia.optimism.io",
      accounts: ["634e09c8e44458a98ff5aeee556fcfdbffe7918e8d8121991ca970ec68f34b93"]
    }
  }
};
