import { BigNumber } from "ethers";
import { HashZero } from "@ethersproject/constants";

require("hardhat").ethers;

async function main () {
  const NFTCrowdsaleGenerator = await ethers.getContractFactory("NFTCrowdsaleGenerator");
  const contract = await NFTCrowdsaleGenerator.deploy();
  await contract.deployed();
  console.log(`contract is deployed to ${contract.address}`);
  await contract.createCrowdsale({
    name: "Mock NFT",
    symbol: "MOCK",
    maxSupply: 10000,
  }, "0xdAC17F958D2ee523a2206206994597C13D831ec7", [
    {
      startTime: BigNumber.from(1708679659),
      durationInSec: BigNumber.from(24 * 60 * 60), // 24 hours
      maxMintableNFTs: BigNumber.from(100),
      maxMintableNFTsPerAddress: BigNumber.from(3),
      price: BigNumber.from((2 * 1000000000000000000).toString()),
      whitelistedMerklRoot: HashZero,
    },
  ]);
  console.log(`crowdsalesLength ${await contract.crowdsalesLength()}`);
  console.log(`crowdsales 0 ${await contract.crowdsales(0)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
