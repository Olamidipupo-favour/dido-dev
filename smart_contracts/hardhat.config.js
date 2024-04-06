require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    "optimism-sepolia": {
      url: "https://sepolia.optimism.io",
      chainId:11155420,
      accounts: ["***REMOVED***"]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "***REMOVED***"
  },
  sourcify: {
  enabled: true
}
};
