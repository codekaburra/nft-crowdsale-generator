// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@codekaburra/asset-withdrawable/contracts/AssetWithdrawable.sol";
import "./interfaces/INFT.sol";
import "./interfaces/INFTCrowdsale.sol";

/**
 * @notice Crowdsale of NFT
 *
 * @dev functions defination please refer to INFTCrowdsale
 */
contract NFTCrowdsale is Ownable, ReentrancyGuard, AssetWithdrawable, INFTCrowdsale {
    using SafeERC20 for IERC20;
    address public immutable paymentToken; // ERC20 token pay for mint NFT
    INFT public immutable nft; // NFT to be mint
    uint8 public lastSalePhraseIndex; // NFT to be mint
    mapping(uint8 => uint256) public numOfMintedNFTs; // per SalePhrase
    mapping(uint8 => SalePhrase) private phrases;
    mapping(address => uint256[]) public userMintedTokens;

    event MintedNFTs(uint8 indexed _salePhrase, address indexed _address, uint256 numToMinted, uint256 costToMint);
    event MintedRemainingNFTs(address indexed _address, uint256 numToMinted);
    event SetSale(
        uint8 salePhraseIndex,
        uint256 startTime,
        uint256 durationInSec,
        uint256 maxMintableNFTs,
        uint256 maxMintableNFTsPerAddress,
        uint256 price,
        bytes32 whitelistedMerklRoot
    );

    modifier isValidSaleConfig(SalePhrase memory salePhrase) {
        require(salePhrase.startTime > block.timestamp, "NFTCrowdsale:isValidSaleConfig: startTime should be > now");
        require(salePhrase.durationInSec > 0, "NFTCrowdsale:isValidSaleConfig: durationInSec should be > 0");
        require(salePhrase.maxMintableNFTs > 0, "NFTCrowdsale:isValidSaleConfig: maxMintableNFTs should be > 0");
        require(
            salePhrase.maxMintableNFTsPerAddress > 0,
            "NFTCrowdsale:isValidSaleConfig: maxMintableNFTsPerAddress should be > 0"
        );
        require(salePhrase.price > 0, "NFTCrowdsale:isValidSaleConfig: price should be > 0");
        _;
    }

    constructor(address _paymentToken, address _nft, SalePhrase[] memory _salePhrases) {
        paymentToken = _paymentToken;
        nft = INFT(_nft);
        require(_salePhrases.length > 0, "NFTCrowdsale: minimum 1 SalePhrase");
        _setSale(_salePhrases[0], 0);
        if (_salePhrases.length > 1) {
            for (uint8 i = 1; i < _salePhrases.length; i++) {
                addSalePhrase(_salePhrases[i], i);
            }
        }
    }

    function getSalePhrase(uint8 _salePhraseIndex) external view returns (SalePhrase memory) {
        return phrases[_salePhraseIndex];
    }

    function getUserMintedTokens(address _address) public view returns (uint256[] memory) {
        return userMintedTokens[_address];
    }

    function userMintedTokensLength(address _address) public view returns (uint256) {
        return userMintedTokens[_address].length;
    }

    function mintNFTs(uint256 _numToMinted, bytes32[] memory _merkleProof) external payable nonReentrant {
        uint8 salePhraseIndex = getCurrentOrComingSalePhrase();
        require(isSaleActive(salePhraseIndex), "NFTCrowdsale:mintNFTs: SalePhrase is not active");
        require(
            isWhitelistedAddress(msg.sender, _merkleProof, salePhraseIndex),
            "NFTCrowdsale:mintNFTs: Non-whitelisted Address"
        );
        require(
            userMintedTokensLength(msg.sender) + _numToMinted <= phrases[salePhraseIndex].maxMintableNFTsPerAddress,
            "NFTCrowdsale:mintNFTs: Requested _numToMinted exceeds maximum per address"
        );
        IERC20 token = IERC20(paymentToken);
        uint256 costToMint = getMintPrice(salePhraseIndex) * _numToMinted;
        uint256 balance = token.balanceOf(msg.sender);
        require(costToMint <= balance, "NFTCrowdsale:mintNFTs: You Are Too Poor");
        require(
            numOfMintedNFTs[salePhraseIndex] + _numToMinted <= phrases[salePhraseIndex].maxMintableNFTs,
            "NFTCrowdsale:mintNFTs: Minting would exceed max supply in current phrase"
        );
        _mintNFTs(_numToMinted);
        numOfMintedNFTs[salePhraseIndex] = numOfMintedNFTs[salePhraseIndex] + _numToMinted;
        token.safeTransferFrom(msg.sender, address(this), costToMint);
        emit MintedNFTs(uint8(salePhraseIndex), msg.sender, _numToMinted, costToMint);
    }

    function _mintNFTs(uint256 _numToMinted) internal {
        require(
            nft.totalSupply() + _numToMinted <= nft.maxSupply(),
            "NFTCrowdsale:_mintNFTs: Minting would exceed max supply"
        );
        require(_numToMinted > 0, "NFTCrowdsale:_mintNFTs: _numToMinted should be > 0");
        for (uint256 i = 0; i < _numToMinted; i++) {
            uint256 mintIndex = nft.totalSupply();
            nft.mint(mintIndex, msg.sender);
            userMintedTokens[msg.sender].push(mintIndex);
        }
    }

    function getCurrentOrComingSalePhrase() public view returns (uint8) {
        if (block.timestamp >= phrases[lastSalePhraseIndex].startTime) {
            return lastSalePhraseIndex;
        }
        if (block.timestamp < phrases[0].startTime) {
            return 0;
        }
        uint8 result;
        for (uint8 i = 0; i < lastSalePhraseIndex; i++) {
            if (block.timestamp > phrases[i].startTime + phrases[i].durationInSec) {
                result = i + 1;
            }
        }
        return result;
    }

    function isWhitelistedAddress(
        address _address,
        bytes32[] memory _merkleProof,
        uint8 _salePhraseIndex
    ) public view returns (bool) {
        bytes32 merkleRoot = phrases[_salePhraseIndex].whitelistedMerklRoot;
        if (merkleRoot != 0) {
            return (MerkleProof.verify(_merkleProof, merkleRoot, keccak256(abi.encodePacked(_address))));
        }
        return true;
    }

    function isSaleActive(uint8 _salePhraseIndex) public view returns (bool) {
        return
            block.timestamp >= phrases[_salePhraseIndex].startTime &&
            block.timestamp < phrases[_salePhraseIndex].startTime + phrases[_salePhraseIndex].durationInSec;
    }

    function mintRemainingNFTs() external onlyOwner returns (uint256) {
        require(
            block.timestamp > phrases[lastSalePhraseIndex].startTime + phrases[lastSalePhraseIndex].durationInSec,
            "NFTCrowdsale:mintRemainingNFTs: is not allow before last phrases end"
        );
        uint256 totalNumOfMintedNFTs;
        for (uint8 i = 0; i < lastSalePhraseIndex; i++) {
            totalNumOfMintedNFTs = totalNumOfMintedNFTs + numOfMintedNFTs[i];
        }
        uint256 numToMinted = nft.maxSupply() - totalNumOfMintedNFTs;
        if (numToMinted > 20) {
            numToMinted = 20;
        }
        _mintNFTs(numToMinted);
        emit MintedRemainingNFTs(msg.sender, numToMinted);
        return numToMinted;
    }

    function getMintPrice(uint8 _salePhraseIndex) public view returns (uint256) {
        return phrases[_salePhraseIndex].price;
    }

    /* ========== ONLY OWNER FUNCTIONS ========== */

    function addSalePhrase(
        SalePhrase memory _salePhrase,
        uint8 _salePhraseIndex
    ) public onlyOwner isValidSaleConfig(_salePhrase) {
        require(lastSalePhraseIndex < _salePhraseIndex, "NFTCrowdsale:addSalePhrase: Invalid target salePhraseIndex");
        require(
            phrases[lastSalePhraseIndex].startTime + phrases[lastSalePhraseIndex].durationInSec < _salePhrase.startTime,
            "NFTCrowdsale:addSalePhrase: overlapping with previousSalePhrase"
        );
        require(block.timestamp < _salePhrase.startTime, "NFTCrowdsale:addSalePhrase: SalePhrase has already begun");
        lastSalePhraseIndex++;
        _setSale(_salePhrase, lastSalePhraseIndex);
    }

    function updateSalePhrase(
        SalePhrase memory _salePhrase,
        uint8 _salePhraseIndex
    ) external onlyOwner isValidSaleConfig(_salePhrase) {
        if (_salePhraseIndex > 0) {
            require(
                phrases[_salePhraseIndex - 1].startTime + phrases[_salePhraseIndex - 1].durationInSec <
                    _salePhrase.startTime,
                "NFTCrowdsale:updateSalePhrase: overlapping with previousSalePhrase"
            );
        }
        if (_salePhraseIndex < lastSalePhraseIndex) {
            require(
                _salePhrase.startTime + _salePhrase.durationInSec < phrases[_salePhraseIndex + 1].startTime,
                "NFTCrowdsale:updateSalePhrase: overlapping with nextSalePhrase"
            );
        }
        require(
            _salePhraseIndex >= getCurrentOrComingSalePhrase(),
            "NFTCrowdsale:updateSalePhrase: Edit historical salePhraseIndex rejected"
        );
        require(
            block.timestamp < phrases[_salePhraseIndex].startTime,
            "NFTCrowdsale:updateSalePhrase: SalePhrase has already begun"
        );
        _setSale(_salePhrase, _salePhraseIndex);
    }

    function _setSale(SalePhrase memory salePhrase, uint8 _salePhraseIndex) internal isValidSaleConfig(salePhrase) {
        phrases[_salePhraseIndex] = salePhrase;
        emit SetSale(
            _salePhraseIndex,
            salePhrase.startTime,
            salePhrase.durationInSec,
            salePhrase.maxMintableNFTs,
            salePhrase.maxMintableNFTsPerAddress,
            salePhrase.price,
            salePhrase.whitelistedMerklRoot
        );
    }
}
