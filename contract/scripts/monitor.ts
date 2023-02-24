require("hardhat").ethers;
const moment = require("moment");

async function main () {
  const contract = await ethers.getContractAt("NFTCrowdsaleGenerator", process.env.GENERATOR_ADDRESS);
  console.log(`contract at ${contract.address}`);
  const crowdsalesLength = await contract.crowdsalesLength();
  console.log(`crowdsalesLength ${await contract.crowdsalesLength()}`);
  if (!crowdsalesLength.isZero()) {
    for (let i = 0; i < +crowdsalesLength.toString(); i++) {
      const crowdsale = await ethers.getContractAt("NFTCrowdsale", await contract.crowdsales(i));
      console.log(`--------------------- crowdsale[${i}] at ${crowdsale.address} ----------------------`);
      const currentSalePhrase = await crowdsale.getCurrentOrComingSalePhrase();
      const lastSalePhraseIndex = await crowdsale.lastSalePhraseIndex();
      const nftAddress = await crowdsale.nft();
      console.log(`💬 currentSalePhrase : ${currentSalePhrase} lastSalePhraseIndex ${lastSalePhraseIndex} nftAddress ${nftAddress}`);
      for (let i = 0; i <= +lastSalePhraseIndex.toString(); i++) {
        const currentSale = await crowdsale.getSalePhrase(i);
        const isSaleActive = await crowdsale.isSaleActive(i);
        console.log(`💬 SalePhrase[${i}] : isSaleActive ${isSaleActive}`, formatSalePhrase(currentSale));
      }
    }
  }
}

export function formatSalePhrase (salePhrase: any) {
  const [
    startTime,
    durationInSec,
    maxMintableNFTs,
    maxMintableNFTsPerAddress,
    price,
    whitelistedMerklRoot,
  ] = salePhrase;
  return {
    startTime: `${startTime.toString()}  | ${moment.unix((+startTime).toString()).format("YYYY-MM-DD HH:mm:ssZ")}`,
    durationInSec: `${durationInSec} Sec | ${+durationInSec.toString() / 60 / 60} Hour`,
    maxMintableNFTs: maxMintableNFTs.toString(),
    maxMintableNFTsPerAddress: maxMintableNFTsPerAddress.toString(),
    price: +price.toString() / 1000000000000000000,
    whitelistedMerklRoot,
  };
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
