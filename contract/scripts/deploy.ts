
require("hardhat").ethers;

async function main () {
  const NFTCrowdsaleGenerator = await ethers.getContractFactory("NFTCrowdsaleGenerator");
  const contract = await NFTCrowdsaleGenerator.deploy();
  await contract.deployed();
  console.log(`contract is deployed to ${contract.address}`);
  console.log(`crowdsalesLength ${await contract.crowdsalesLength()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
