

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { ethers } = require('hardhat')


const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
    // Code goes here


    // deploy dappazon
    const Dido = await hre.ethers.getContractFactory("Dido")
    const dido = await Dido.deploy()
    // await dappazon.deployed()

    console.log(`Deployed Dido Contract at: ${await dido.getAddress()}\n`)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
