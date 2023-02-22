import { expectRevert } from "@openzeppelin/test-helpers";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

describe("NFT", () => {
  let mockContract: Contract;
  let deployer: Signer;
  let signers: Signer[];
  before(async () => {
    signers = await ethers.getSigners();
    deployer = signers[0];
  });

  beforeEach(async () => {
    mockContract = await (await ethers.getContractFactory("NFT")).deploy("NFT", "MOCK");
  });

  describe("mint/isMinted/enableCrowdsale/disableCrowdsale", () => {
    const tokenId = 2000;
    it("should return false when tokenId is not minted", async () => {
      expect(await mockContract.isMinted(tokenId)).to.be.equals(false);
    });
    it("should return true when tokenId is minted", async () => {
      const crowdsale = signers[1];
      const user = signers[2];
      await mockContract.enableCrowdsale(crowdsale.address);
      expect(await mockContract.isMinted(tokenId)).to.be.equals(false);
      await mockContract.connect(crowdsale).mint(tokenId, user.address);
      expect(await mockContract.isMinted(tokenId)).to.be.equals(true);
      await expectRevert(
        mockContract.connect(crowdsale).mint(tokenId, user.address),
        "NFT:mint: NFT has already been minted",
      );

      await mockContract.disableCrowdsale(crowdsale.address);
      await expectRevert(
        mockContract.connect(crowdsale).mint(tokenId, user.address),
        "NFT:onlyCrowdsale: only whitelisted & enabled crowdsale allowed",
      );
      expect(await mockContract.isMinted(tokenId + 1)).to.be.equals(false);
    });
  });

  describe("baseURI", () => {
    const baseURI = "URIURIURIURIURIURI";
    it("should return empty when baseURI is not set", async () => {
      expect(await mockContract.baseURI()).to.be.equals("");
    });
    it("should return new baseURI after setBaseURI", async () => {
      expect(await mockContract.baseURI()).to.be.equals("");
      await mockContract.setBaseURI(baseURI);
      expect(await mockContract.baseURI()).to.be.equals(baseURI);
    });
  });
});
