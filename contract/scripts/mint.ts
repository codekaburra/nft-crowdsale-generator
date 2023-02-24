import { BigNumber, utils } from "ethers";
import { HashZero } from "@ethersproject/constants";
import { MerkleTree } from "merkletreejs";
import { formatSalePhrase } from "./monitor";
const { keccak256 } = utils;

require("hardhat").ethers;

async function main () {
  const [deployer] = await ethers.getSigners();
  const generator = await ethers.getContractAt("NFTCrowdsaleGenerator", process.env.GENERATOR_ADDRESS);
  console.log(`generator at ${generator.address}`);
  console.log(`crowdsalesLength ${await generator.crowdsalesLength()}`);
  const crowdsale = await ethers.getContractAt("NFTCrowdsale", await generator.crowdsales(1));
  console.log(`crowdsale at ${crowdsale.address}`);

  console.log(`--------------------- crowdsale at ${crowdsale.address} ----------------------`);
  const currentSalePhrase = await crowdsale.getCurrentOrComingSalePhrase();
  const currentSale = await crowdsale.getSalePhrase(currentSalePhrase);
  const isSaleActive = await crowdsale.isSaleActive(currentSalePhrase);
  const [
    startTime,
    durationInSec,
    maxMintableNFTs,
    maxMintableNFTsPerAddress,
    price,
    whitelistedMerklRoot,
  ] = currentSale;
  console.log(`💬 getCurrentSalePhrase : ${currentSalePhrase} now ${Date.now()}`, formatSalePhrase(await crowdsale.getSalePhrase(currentSalePhrase)));
  console.log(`💬 getCurrentSalePhrase : ${currentSalePhrase} pending ${Date.now() - startTime} isSaleActive ${isSaleActive}`);
  // const proof: MerkleTree[] = [];
  // const phrase1PresaleTree = new MerkleTree(
  //   [].map(address => keccak256(address)),
  //   keccak256, { sort: true });
  // proof = phrase1PresaleTree.getHexProof(keccak256(deployer.address));

  const paymentToken = await ethers.getContractAt("IERC20", process.env.ERC20_1, deployer);
  const balance = await paymentToken.balanceOf(deployer.address);
  const allowance = await paymentToken.allowance(deployer.address, crowdsale.address);
  console.log(`💬 paymentToken.balance : ${balance} | allowance ${allowance}`);
  if (allowance.isZero()) {
    await paymentToken.approve(crowdsale.address, balance);
    console.log("💬 paymentToken.approve");
  }
  if (isSaleActive) {
    const transaction = await crowdsale.mintNFTs(1, [], { gasLimit: 3000000 });
    console.log("💬 transaction done");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
