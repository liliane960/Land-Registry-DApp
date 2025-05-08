const hre = require("hardhat");

async function main() {
  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy(); // This already deploys the contract

  //  Remove: await landRegistry.deployed();
 
  await landRegistry.waitForDeployment(); // New in ethers v6

  console.log("LandRegistry deployed to:", await landRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
