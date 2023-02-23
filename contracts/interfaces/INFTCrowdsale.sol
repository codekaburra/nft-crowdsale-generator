// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "./INFT.sol";

/**
 * @notice Crowdsale of NFT
 */
interface INFTCrowdsale {
    struct SalePhrase {
        uint256 startTime;
        uint256 durationInSec;
        uint256 maxMintableNFTs; // total allowable mint amount in this phrase
        uint256 maxMintableNFTsPerAddress;
        uint256 price;
        bytes32 whitelistedMerklRoot;
    }

    /**
     * @dev ERC20 token address for purchasing NFT
     */
    function paymentToken() external view returns (address);

    /**
     * @dev ERC721 token address of NFT
     */
    function nft() external view returns (INFT);

    /**
     * @return num of minted NFT SalePhraseName in given SalePhraseName
     */
    function numOfMintedNFTs(uint8 salePhraseIndex) external view returns (uint256 num);

    /**
     * @return SalePhrase by index which includes time range & max setting & price & whitelisting
     */
    function getSalePhrase(uint8 salePhraseIndex) external view returns (SalePhrase memory);

    /**
     * @param _address user address
     * @param _arrayIndex array index of all tokenId minted by given user address
     * @return tokenId get NFT's tokenId of given user & arrayIndex
     * If arrayIndex is unknown, please refer to getUserMintedTokens(_address)
     */
    function userMintedTokens(address _address, uint256 _arrayIndex) external view returns (uint256 tokenId);

    /**
     * @param _address user address
     * @return tokenIds all tokenIds which is minted by given user address
     */
    function getUserMintedTokens(address _address) external view returns (uint256[] memory tokenIds);

    /**
     * @param _address user address
     * @return numOfTokens number of all tokenIds which is minted by given user address
     */
    function userMintedTokensLength(address _address) external view returns (uint256 numOfTokens);

    /**
     * @return currentOrComingSalePhrase currently active SalePhraseName / Next active SalePhraseName
     */
    function getCurrentOrComingSalePhrase() external view returns (uint8 currentOrComingSalePhrase);

    /**
     * @param _address user address
     * @notice Check if given user is whitelisted address with given merkleProof and specific _salePhrase
     */
    function isWhitelistedAddress(
        address _address,
        bytes32[] calldata _merkleProof,
        uint8 _salePhraseIndex
    ) external view returns (bool);

    /**
     * @notice Check if given salePhrase is currently active
     */
    function isSaleActive(uint8 _salePhraseIndex) external view returns (bool);

    /**
     * @notice get mint price of each NFT in terms of paymentToken
     */
    function getMintPrice(uint8 _salePhraseIndex) external view returns (uint256);

    /**
     * @notice function for user mint NFT
     */
    function mintNFTs(uint256 _numToAdopt, bytes32[] memory _merkleProof) external payable;

    /**
     * @notice function for minting remaining unminted NFT after public phrases end
     * @dev onlyOwner
     */
    function mintRemainingNFTs() external returns (uint256);

    function updateSalePhrase(SalePhrase memory sale, uint8 _salePhraseIndex) external;
}
