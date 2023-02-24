import { BigNumber } from "ethers";
import { HashZero } from "@ethersproject/constants";

require("hardhat").ethers;

async function main () {
  const contract = await ethers.getContractAt("NFTCrowdsaleGenerator", process.env.GENERATOR_ADDRESS);
  console.log(`contract at ${contract.address}`);
  await contract.createCrowdsale({
    name: "Mock NFT",
    symbol: "MOCK",
    maxSupply: 10000,
  }, process.env.ERC20_1, [
    {
      startTime: BigNumber.from(Date.now()).div(1000).add(200),
      durationInSec: BigNumber.from(48).mul(60).mul(60), // 48 hours
      maxMintableNFTs: BigNumber.from(100),
      maxMintableNFTsPerAddress: BigNumber.from(3),
      price: BigNumber.from(1 * 1000).toString(),
      whitelistedMerklRoot: HashZero,
    },
  ]);
  console.log(`crowdsalesLength ${await contract.crowdsalesLength()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
