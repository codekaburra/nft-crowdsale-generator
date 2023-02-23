// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
pragma solidity >=0.8.0;

/**
 * @title NFT in ERC-721 Non-Fungible Token Standard
 */
interface INFT is IERC721Enumerable {
    /**
     * @notice maximum supply for this NFT
     */
    function maxSupply() external view returns (uint256);

    /**
     * @notice check if  given crowdsale address is enabled for minting NFT
     */
    function crowdsales(address crowdsale) external view returns (bool);

    /**
     * @notice IPFS baseURI of NFT
     */
    function baseURI() external view returns (string memory);

    /**
     * @notice admin function to update baseURI
     */
    function setBaseURI(string memory uri) external;

    /**
     * @notice admin function to control whitelist who can mint NFT
     */
    function enableCrowdsale(address crowdsale) external;

    /**
     * @notice admin function to control whitelist who can mint NFT
     */
    function disableCrowdsale(address crowdsale) external;

    /**
     * @param tokenId tokenId to be check
     * @notice if given tokenId is minted, return true
     * @dev this is isMinted() function, but with a meaningful function name
     */
    function isMinted(uint256 tokenId) external view returns (bool);

    /**
     * @param tokenId tokenId to be minted
     * @param user ERC721 mint to, = token owner after minting
     * @dev this is mint() function, but with a meaningful function name
     */
    function mint(uint256 tokenId, address user) external;
}
