import { BigNumber, Contract, Signer } from "ethers";
import { HashZero } from "@ethersproject/constants";
import { expect } from "chai";

describe.only("NFTCrowdsaleGenerator", () => {
  let mockContract: Contract;
  let deployer: Signer;
  let signers: Signer[];
  before(async () => {
    signers = await ethers.getSigners();
    deployer = signers[0];
  });

  beforeEach(async () => {
    mockContract = await (await ethers.getContractFactory("NFTCrowdsaleGenerator")).deploy();
  });

  describe("createCrowdsale", () => {
    it("should return false when tokenId is not minted", async () => {
      expect(await mockContract.crowdsalesLength()).to.be.equals(0);
      await mockContract.createCrowdsale({
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
      expect(await mockContract.crowdsalesLength()).to.be.equals(1);
    });
  });
});
