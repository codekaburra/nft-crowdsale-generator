import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expectRevert } from "@openzeppelin/test-helpers";
import { expect } from "chai";
import { BigNumber, utils, Contract, Signer } from "ethers";
import { HashZero, MaxUint256 } from "@ethersproject/constants";
import { MerkleTree } from "merkletreejs";
const { keccak256 } = utils;

describe("NFTCrowdsale", () => {
  const isDebugMode = false;
  let mockNFTCrowdsaleContract: Contract;
  let deployer: Signer;
  const users: Signer[] = [];
  const phrase1PresaleUserCutOffIndex = 3;
  const phrase2PresaleUserCutOffIndex = 6;
  let phrase1PresaleTree: MerkleTree;
  let phrase2PresaleTree: MerkleTree;
  let paymentToken: Contract;
  let mockNFTContract: Contract;
  const phrase1PresaleConfig = {
    startTime: BigNumber.from(0),
    durationInSec: BigNumber.from(2 * 60 * 60), // 2 hours
    maxMintableNFTs: BigNumber.from(100),
    maxMintableNFTsPerAddress: BigNumber.from(1),
    price: BigNumber.from((1 * 1000000000000000000).toString()), // 1 Token
    whitelistedMerklRoot: HashZero,
  };
  const phrase2PresaleConfig = {
    startTime: BigNumber.from(0),
    durationInSec: BigNumber.from(4 * 60 * 60), // 2 hours
    maxMintableNFTs: BigNumber.from(200),
    maxMintableNFTsPerAddress: BigNumber.from(3),
    price: BigNumber.from((1 * 1000000000000000000).toString()), // 1 Token
    whitelistedMerklRoot: HashZero,
  };
  const publicSaleConfig = {
    startTime: BigNumber.from(0),
    durationInSec: BigNumber.from(24 * 60 * 60), // 24 hours
    maxMintableNFTs: BigNumber.from(100000 - 100 - 200),
    maxMintableNFTsPerAddress: BigNumber.from(3),
    price: BigNumber.from((2 * 1000000000000000000).toString()), // 2 Token
    whitelistedMerklRoot: HashZero,
  };
  before(async () => {
    const signers = await ethers.getSigners();
    deployer = signers[0];
    if (isDebugMode) {
      console.log("deployer", deployer.address);
    }
    paymentToken = await (await ethers.getContractFactory("MockERC20")).deploy("TokenA", "AAA", "1000000000000000000000000000000000000000");
    for (let i = 1; i < 10; i++) {
      users.push(signers[i]);
      if (isDebugMode) {
        console.log(`signers[${i}]`, signers[i].address);
      }
    }
    phrase1PresaleTree = new MerkleTree(
      users.slice(0, phrase1PresaleUserCutOffIndex).map(signer => keccak256(signer.address)),
      keccak256, { sort: true });
    phrase2PresaleTree = new MerkleTree(
      users.slice(0, phrase2PresaleUserCutOffIndex).map(signer => keccak256(signer.address)),
      keccak256, { sort: true });
  });

  beforeEach(async () => {
    const currentTime = BigNumber.from((await time.latest()).toString());
    phrase1PresaleConfig.startTime = currentTime.add(1000);
    phrase2PresaleConfig.startTime = phrase1PresaleConfig.startTime.add(phrase1PresaleConfig.durationInSec).add(4 * 60 * 60);
    publicSaleConfig.startTime = phrase2PresaleConfig.startTime.add(phrase2PresaleConfig.durationInSec).add(4 * 60 * 60);
    phrase1PresaleConfig.whitelistedMerklRoot = phrase1PresaleTree.getHexRoot();
    phrase2PresaleConfig.whitelistedMerklRoot = phrase2PresaleTree.getHexRoot();
    mockNFTContract = await (await ethers.getContractFactory("NFT")).deploy("NFT", "MOCK");
    mockNFTCrowdsaleContract = await (await ethers.getContractFactory("NFTCrowdsale")).deploy(
      paymentToken.address,
      mockNFTContract.address,
      [phrase1PresaleConfig, phrase2PresaleConfig],
    );
    await mockNFTCrowdsaleContract.addSalePhrase(publicSaleConfig, 2);
    await mockNFTContract.enableCrowdsale(mockNFTCrowdsaleContract.address);
    if (isDebugMode) {
      console.log("mockNFTContract", mockNFTContract.address);
      console.log("mockNFTCrowdsaleContract", mockNFTCrowdsaleContract.address);
    }
  });
  describe("mintNFTs", () => {
    describe("phrase 1 presale", () => {
      it("should revert when sales has not active", async () => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase1PresaleConfig.maxMintableNFTsPerAddress,
              phrase1PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: SalePhrase is not active",
          );
        }
      });
      it("should revert when is not phrase 1 presale whitelisted", async () => {
        await time.increaseTo((phrase1PresaleConfig.startTime.toNumber()));
        for (let i = phrase1PresaleUserCutOffIndex; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase1PresaleConfig.maxMintableNFTsPerAddress,
              phrase1PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: Non-whitelisted Address",
          );
        }
      });
      it("should revert when user is phrase 2 presale whitelisted but with wrong proof", async () => {
        await time.increaseTo((phrase1PresaleConfig.startTime.toNumber()));
        for (let i = phrase1PresaleUserCutOffIndex; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase1PresaleConfig.maxMintableNFTsPerAddress,
              [],
            ),
            "NFTCrowdsale:mintNFTs: Non-whitelisted Address",
          );
        }
      });

      it("should revert whitelisted user to mint NFT when phrase 1 presale is active and they have not enough $", async () => {
        await time.increaseTo((phrase1PresaleConfig.startTime.toNumber()));
        for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase1PresaleConfig.maxMintableNFTsPerAddress,
              phrase1PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: You Are Too Poor ",
          );
        }
      });
      it("should allow whitelisted user to mint NFT when phrase 1 presale is active and they have enough $", async () => {
        await time.increaseTo((phrase1PresaleConfig.startTime.toNumber()));
        for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
          const user = users[i];
          await paymentToken.transfer(user.address, phrase1PresaleConfig.maxMintableNFTsPerAddress.mul(phrase1PresaleConfig.price));
          await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
          await mockNFTCrowdsaleContract.connect(user).mintNFTs(
            phrase1PresaleConfig.maxMintableNFTsPerAddress,
            phrase1PresaleTree.getHexProof(keccak256(user.address),
            ));
          expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(
            phrase1PresaleConfig.maxMintableNFTsPerAddress.toString(),
          );
          expect(await mockNFTCrowdsaleContract.getUserMintedTokens(user.address)).to.be.deep.equals([i]);
        }
      });
      it("should allow user mintNFTs multiple times until excess quata", async () => {
        await time.increaseTo((phrase1PresaleConfig.startTime.toNumber()));
        for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
          const user = users[i];
          await paymentToken.transfer(user.address, phrase1PresaleConfig.maxMintableNFTsPerAddress.mul(phrase1PresaleConfig.price));
          await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
          for (let i = 0; i < +phrase1PresaleConfig.maxMintableNFTsPerAddress.toString(); i++) {
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              phrase1PresaleTree.getHexProof(keccak256(user.address)),
            );
          }
          expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase1PresaleConfig.maxMintableNFTsPerAddress);
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              phrase1PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: Requested _numToMinted exceeds maximum per address",
          );
        }
      });
    });

    describe("phrase 2 presale", () => {
      it("should revert when sales has not active", async () => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase2PresaleConfig.maxMintableNFTsPerAddress,
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: SalePhrase is not active",
          );
        }
      });
      it("should revert when user is phrase 2 presale whitelisted but with wrong proof", async () => {
        await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
        for (let i = phrase2PresaleUserCutOffIndex; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase2PresaleConfig.maxMintableNFTsPerAddress,
              [],
            ),
            "NFTCrowdsale:mintNFTs: Non-whitelisted Address",
          );
        }
      });
      it("should revert when is not phrase 2 presale whitelisted", async () => {
        await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
        for (let i = phrase2PresaleUserCutOffIndex; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase2PresaleConfig.maxMintableNFTsPerAddress,
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: Non-whitelisted Address",
          );
        }
      });
      it("should revert whitelisted user to mint NFT when phrase 2 presale is active and they have not enough $", async () => {
        await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
        for (let i = 0; i < phrase2PresaleUserCutOffIndex; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase2PresaleConfig.maxMintableNFTsPerAddress,
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: You Are Too Poor ",
          );
        }
      });
      it("should allow whitelisted user to mint NFT when phrase 2 presale is active and they have enough $", async () => {
        await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
        for (let i = 0; i < phrase2PresaleUserCutOffIndex; i++) {
          const user = users[i];
          await paymentToken.transfer(user.address, phrase2PresaleConfig.maxMintableNFTsPerAddress.mul(phrase2PresaleConfig.price));
          await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
          await mockNFTCrowdsaleContract.connect(user).mintNFTs(
            phrase2PresaleConfig.maxMintableNFTsPerAddress,
            phrase2PresaleTree.getHexProof(keccak256(user.address),
            ));
          expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase2PresaleConfig.maxMintableNFTsPerAddress);
        }
      });
      it("should allow user mintNFTs multiple times until excess quata", async () => {
        await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
        for (let i = 0; i < phrase2PresaleUserCutOffIndex; i++) {
          const user = users[i];
          await paymentToken.transfer(user.address, phrase2PresaleConfig.maxMintableNFTsPerAddress.mul(phrase2PresaleConfig.price));
          await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
          for (let i = 0; i < +phrase2PresaleConfig.maxMintableNFTsPerAddress.toString(); i++) {
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            );
          }
          expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase2PresaleConfig.maxMintableNFTsPerAddress);
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            ),
            "NFTCrowdsale:mintNFTs: Requested _numToMinted exceeds maximum per address",
          );
        }
      });
    });

    describe("public sale", () => {
      it("should revert when sales has not active", async () => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              publicSaleConfig.maxMintableNFTsPerAddress,
              [],
            ),
            "NFTCrowdsale:mintNFTs: SalePhrase is not active",
          );
        }
      });
      it("should revert when is not public sale whitelisted", async () => {
        await time.increaseTo((publicSaleConfig.startTime.toNumber()));
        for (let i = users.length; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              publicSaleConfig.maxMintableNFTsPerAddress,
              [],
            ),
            "NFTCrowdsale:mintNFTs: Non-whitelisted Address",
          );
        }
      });
      it("should revert whitelisted user to mint NFT when public sale is active and they have not enough $", async () => {
        await time.increaseTo((publicSaleConfig.startTime.toNumber()));
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              publicSaleConfig.maxMintableNFTsPerAddress,
              [],
            ),
            "NFTCrowdsale:mintNFTs: You Are Too Poor ",
          );
        }
      });
      it("should allow whitelisted user to mint NFT when public sale is active and they have enough $", async () => {
        await time.increaseTo((publicSaleConfig.startTime.toNumber()));
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await paymentToken.transfer(user.address, publicSaleConfig.maxMintableNFTsPerAddress.mul(publicSaleConfig.price));
          await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
          await mockNFTCrowdsaleContract.connect(user).mintNFTs(
            publicSaleConfig.maxMintableNFTsPerAddress,
            [],
          );
          expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(publicSaleConfig.maxMintableNFTsPerAddress);
        }
      });
      it("should allow user mintNFTs multiple times until excess quata", async () => {
        await time.increaseTo((publicSaleConfig.startTime.toNumber()));
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await paymentToken.transfer(user.address, publicSaleConfig.maxMintableNFTsPerAddress.mul(publicSaleConfig.price));
          await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
          for (let i = 0; i < +publicSaleConfig.maxMintableNFTsPerAddress.toString(); i++) {
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              [],
            );
          }
          expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(publicSaleConfig.maxMintableNFTsPerAddress);
          await expectRevert(
            mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              [],
            ),
            "NFTCrowdsale:mintNFTs: Requested _numToMinted exceeds maximum per address",
          );
        }
      });
    });

    describe("mixed phrase", () => {
      describe("when user mint some in phrase 1 presales", () => {
        beforeEach(async () => {
          await time.increaseTo((phrase1PresaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await paymentToken.transfer(user.address, publicSaleConfig.maxMintableNFTsPerAddress.mul(phrase1PresaleConfig.price));
            await paymentToken.connect(user).approve(mockNFTCrowdsaleContract.address, MaxUint256);
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase1PresaleConfig.maxMintableNFTsPerAddress,
              phrase1PresaleTree.getHexProof(keccak256(user.address)),
            );
            expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase1PresaleConfig.maxMintableNFTsPerAddress);
          }
        });
        it("should revert when whitelisted user to request to mint > quota when phrase 2 presale", async () => {
          await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await expectRevert(
              mockNFTCrowdsaleContract.connect(user).mintNFTs(
                phrase2PresaleConfig.maxMintableNFTsPerAddress,
                phrase2PresaleTree.getHexProof(keccak256(user.address)),
              ),
              "NFTCrowdsale:mintNFTs: Requested _numToMinted exceeds maximum per address",
            );
            expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase1PresaleConfig.maxMintableNFTsPerAddress);
          }
        });
        it("should mint when whitelisted user to request to mint all the rest when phrase 2 presale", async () => {
          await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              phrase2PresaleConfig.maxMintableNFTsPerAddress.sub(phrase1PresaleConfig.maxMintableNFTsPerAddress),
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            );
            expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase2PresaleConfig.maxMintableNFTsPerAddress);
          }
        });

        it("should revert when whitelisted user to request to mint > quota when public sale", async () => {
          await time.increaseTo((publicSaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await expectRevert(
              mockNFTCrowdsaleContract.connect(user).mintNFTs(
                publicSaleConfig.maxMintableNFTsPerAddress,
                [],
              ),
              "NFTCrowdsale:mintNFTs: Requested _numToMinted exceeds maximum per address",
            );
            expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(phrase1PresaleConfig.maxMintableNFTsPerAddress);
          }
        });
        it("should mint when whitelisted user to request to mint all the rest in public sale", async () => {
          await time.increaseTo((publicSaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              publicSaleConfig.maxMintableNFTsPerAddress.sub(phrase1PresaleConfig.maxMintableNFTsPerAddress),
              [],
            );
            expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(publicSaleConfig.maxMintableNFTsPerAddress);
          }
        });
        it("should mint when whitelisted user to request to mint some of the rest in both phrase 2 presale public sale", async () => {
          await time.increaseTo((phrase2PresaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              1,
              phrase2PresaleTree.getHexProof(keccak256(user.address)),
            );
            expect(
              await mockNFTCrowdsaleContract.userMintedTokensLength(user.address),
            ).to.be.equals(phrase1PresaleConfig.maxMintableNFTsPerAddress.add(1));
          }
          await time.increaseTo((publicSaleConfig.startTime.toNumber()));
          for (let i = 0; i < phrase1PresaleUserCutOffIndex; i++) {
            const user = users[i];
            await mockNFTCrowdsaleContract.connect(user).mintNFTs(
              publicSaleConfig.maxMintableNFTsPerAddress.sub(1).sub(phrase1PresaleConfig.maxMintableNFTsPerAddress),
              [],
            );
            expect(await mockNFTCrowdsaleContract.userMintedTokensLength(user.address)).to.be.equals(publicSaleConfig.maxMintableNFTsPerAddress);
          }
        });
      });
    });
  });
  describe("mintRemainingNFTs", () => {
    it("should revert when public sales has not end", async () => {
      await expectRevert(
        mockNFTCrowdsaleContract.mintRemainingNFTs(),
        "NFTCrowdsale:mintRemainingNFTs: is not allow before last phrases end",
      );
    });
    it("should mint all remaining nft when public sales ended", async () => {
      await time.increaseTo((publicSaleConfig.startTime.add(publicSaleConfig.durationInSec).add(1)).toNumber());
      await mockNFTCrowdsaleContract.mintRemainingNFTs();
      const array = [];
      const maxToBeMinteded = 20;
      for (let i = 0; i < maxToBeMinteded; i++) {
        expect(await mockNFTContract.isMinted(i)).to.be.true;
        array.push(i);
        expect(await mockNFTCrowdsaleContract.userMintedTokens(deployer.address, i)).to.be.equals(i);
      }
      expect(await mockNFTCrowdsaleContract.userMintedTokensLength(deployer.address)).to.be.equals(maxToBeMinteded);
    });
    it("should revert when it is not called by owner", async () => {
      await time.increaseTo((publicSaleConfig.startTime.add(publicSaleConfig.durationInSec).add(1)).toNumber());
      try {
        await mockNFTCrowdsaleContract.connect(users[2]).mintRemainingNFTs();
        expect.fail();
      } catch (err) {
        expect(err.message).contains("Ownable: caller is not the owner");
      }
    });
  });
  describe("isWhitelistedAddress", () => {
    it("should return true for whitelisted users", async () => {
      for (let i = 0; i < users.length; i++) {
        const userAddress = users[i].address;
        if (isDebugMode) { console.log(`i ${i} ${userAddress}`); }
        if (i < phrase1PresaleUserCutOffIndex) {
          expect(
            await mockNFTCrowdsaleContract.isWhitelistedAddress(userAddress, phrase1PresaleTree.getHexProof(keccak256(userAddress)), 0),
          ).to.be.true;
        } else {
          expect(await mockNFTCrowdsaleContract.isWhitelistedAddress(userAddress, [], 0)).to.be.false;
        }
        if (i < phrase2PresaleUserCutOffIndex) {
          expect(
            await mockNFTCrowdsaleContract.isWhitelistedAddress(userAddress, phrase2PresaleTree.getHexProof(keccak256(userAddress)), 1),
          ).to.be.true;
        } else {
          expect(await mockNFTCrowdsaleContract.isWhitelistedAddress(userAddress, [], 1)).to.be.false;
        }
        expect(await mockNFTCrowdsaleContract.isWhitelistedAddress(userAddress, [], 2)).to.be.true;
      }
    });
  });
  describe("isSaleActive/getCurrentOrComingSalePhrase", () => {
    describe("phrase 1 presale", () => {
      beforeEach(async () => {
        expect(await mockNFTCrowdsaleContract.getCurrentOrComingSalePhrase()).to.be.equals(0);
        expect(await mockNFTCrowdsaleContract.isSaleActive(1)).to.be.false;
        expect(await mockNFTCrowdsaleContract.isSaleActive(2)).to.be.false;
      });
      it("should return true when phrase 1 presale inactive", async () => {
        expect(await mockNFTCrowdsaleContract.isSaleActive(0)).to.be.false;
      });
      it("should return true when phrase 1 presale active", async () => {
        await time.increaseTo(phrase1PresaleConfig.startTime.toNumber());
        expect(await mockNFTCrowdsaleContract.isSaleActive(0)).to.be.true;
      });
    });
    describe("phrase 2 presale", () => {
      beforeEach(async () => {
        await time.increaseTo((phrase1PresaleConfig.startTime.add(phrase1PresaleConfig.durationInSec).add(1)).toNumber());
        expect(await mockNFTCrowdsaleContract.getCurrentOrComingSalePhrase()).to.be.equals(1);
        expect(await mockNFTCrowdsaleContract.isSaleActive(0)).to.be.false;
        expect(await mockNFTCrowdsaleContract.isSaleActive(2)).to.be.false;
      });
      it("should return true when phrase 2 presale inactive", async () => {
        expect(await mockNFTCrowdsaleContract.isSaleActive(1)).to.be.false;
      });
      it("should return true when phrase 2 presale active", async () => {
        await time.increaseTo(phrase2PresaleConfig.startTime.toNumber());
        expect(await mockNFTCrowdsaleContract.isSaleActive(1)).to.be.true;
      });
    });
    describe("public sale", () => {
      beforeEach(async () => {
        await time.increaseTo((phrase2PresaleConfig.startTime.add(phrase2PresaleConfig.durationInSec).add(1)).toNumber());
        expect(await mockNFTCrowdsaleContract.getCurrentOrComingSalePhrase()).to.be.equals(2);
        expect(await mockNFTCrowdsaleContract.isSaleActive(1)).to.be.equal(false);
        expect(await mockNFTCrowdsaleContract.isSaleActive(2)).to.be.equal(false);
      });
      it("should return true when public sale inactive", async () => {
        expect(await mockNFTCrowdsaleContract.isSaleActive(2)).to.be.equal(false);
      });
      it("should return true when public sale active", async () => {
        await time.increaseTo(publicSaleConfig.startTime.toNumber());
        expect(await mockNFTCrowdsaleContract.isSaleActive(2)).to.be.equal(true);
      });
    });
  });
  describe("getMintPrice", () => {
    it("should return phrase1Presale price when input is 0", async () => {
      expect(await mockNFTCrowdsaleContract.getMintPrice(0)).equal(phrase1PresaleConfig.price);
    });
    it("should return phrase2Presale price when input is 1", async () => {
      expect(await mockNFTCrowdsaleContract.getMintPrice(1)).equal(phrase2PresaleConfig.price);
    });
    it("should return publicSale price when input is 2", async () => {
      expect(await mockNFTCrowdsaleContract.getMintPrice(2)).equal(publicSaleConfig.price);
    });
  });
  describe("setSale", () => {
    describe("phrase1", () => {
      it("should return original sale", async () => {
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).deep.equals(Object.values(phrase1PresaleConfig));
      });
      it("should edit to new sale after updateSalePhrase", async () => {
        const newConfig = { ...phrase1PresaleConfig, startTime: phrase1PresaleConfig.startTime.add(1) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).to.be.deep.equals(Object.values(phrase1PresaleConfig));
        await mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 0);
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).to.be.deep.equals(Object.values(newConfig));
      });
      it("should revert when overlap with next sale", async () => {
        const newConfig = {
          ...phrase1PresaleConfig,
          durationInSec: phrase2PresaleConfig.startTime.sub(phrase1PresaleConfig.startTime),
        };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).to.be.deep.equals(Object.values(phrase1PresaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 0),
          "NFTCrowdsale:updateSalePhrase: overlapping with nextSalePhrase",
        );
      });
      it("should edit to new sale before Presale start", async () => {
        await time.increaseTo(phrase1PresaleConfig.startTime.sub(10).toNumber());
        const newConfig = { ...phrase1PresaleConfig, startTime: phrase1PresaleConfig.startTime.add(10) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).to.be.deep.equals(Object.values(phrase1PresaleConfig));
        await mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 0);
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).to.be.deep.equals(Object.values(newConfig));
      });
      it("should revert when sale already started", async () => {
        await time.increaseTo(phrase1PresaleConfig.startTime.toNumber());
        const newConfig = { ...phrase1PresaleConfig, startTime: phrase1PresaleConfig.startTime.add(10) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(0)).to.be.deep.equals(Object.values(phrase1PresaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 0),
          "NFTCrowdsale:updateSalePhrase: SalePhrase has already begun",
        );
      });
    });
    describe("phrase2", () => {
      it("should return original sale", async () => {
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(phrase2PresaleConfig));
      });
      it("should edit to new sale after updateSalePhrase", async () => {
        const newConfig = { ...phrase2PresaleConfig, startTime: phrase2PresaleConfig.startTime.add(1) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(phrase2PresaleConfig));
        await mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 1);
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(newConfig));
      });
      it("should revert when overlap with previous sale", async () => {
        const newConfig = {
          ...phrase2PresaleConfig,
          startTime: phrase1PresaleConfig.startTime.add(phrase1PresaleConfig.durationInSec).sub(1),
        };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(phrase2PresaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 1),
          "NFTCrowdsale:updateSalePhrase: overlapping with previousSalePhrase",
        );
      });
      it("should revert when overlap with next sale", async () => {
        const newConfig = {
          ...phrase2PresaleConfig,
          durationInSec: publicSaleConfig.startTime.sub(phrase1PresaleConfig.startTime),
        };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(phrase2PresaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 1),
          "NFTCrowdsale:updateSalePhrase: overlapping with nextSalePhrase",
        );
      });
      it("should edit to new sale before Presale start", async () => {
        await time.increaseTo(phrase2PresaleConfig.startTime.sub(10).toNumber());
        const newConfig = { ...phrase2PresaleConfig, startTime: phrase2PresaleConfig.startTime.add(10) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(phrase2PresaleConfig));
        await mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 1);
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(newConfig));
      });
      it("should revert when sale already started", async () => {
        await time.increaseTo(phrase2PresaleConfig.startTime.toNumber());
        const newConfig = { ...phrase2PresaleConfig, startTime: phrase2PresaleConfig.startTime.add(10) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(1)).to.be.deep.equals(Object.values(phrase2PresaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 1),
          "NFTCrowdsale:updateSalePhrase: SalePhrase has already begun",
        );
      });
    });
    describe("Public", () => {
      it("should return original sale", async () => {
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(publicSaleConfig));
      });
      it("should edit to new sale after updateSalePhrase", async () => {
        const newConfig = { ...publicSaleConfig, startTime: publicSaleConfig.startTime.add(1) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(publicSaleConfig));
        await mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 2);
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(newConfig));
      });
      it("should revert when overlap with previous sale", async () => {
        const newConfig = {
          ...publicSaleConfig,
          startTime: phrase2PresaleConfig.startTime.add(phrase2PresaleConfig.durationInSec).sub(1),
        };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(publicSaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 2),
          "NFTCrowdsale:updateSalePhrase: overlapping with previousSalePhrase",
        );
      });
      it("should edit to new sale before Presale start", async () => {
        await time.increaseTo(publicSaleConfig.startTime.sub(10).toNumber());
        const newConfig = { ...publicSaleConfig, startTime: publicSaleConfig.startTime.add(10) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(publicSaleConfig));
        await mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 2);
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(newConfig));
      });
      it("should revert when sale already started", async () => {
        await time.increaseTo(publicSaleConfig.startTime.toNumber());
        const newConfig = { ...publicSaleConfig, startTime: publicSaleConfig.startTime.add(10) };
        expect(await mockNFTCrowdsaleContract.getSalePhrase(2)).to.be.deep.equals(Object.values(publicSaleConfig));
        await expectRevert(
          mockNFTCrowdsaleContract.updateSalePhrase(newConfig, 2),
          "NFTCrowdsale:updateSalePhrase: SalePhrase has already begun",
        );
      });
    });
  });
});
