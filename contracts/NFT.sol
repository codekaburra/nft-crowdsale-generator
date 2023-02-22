// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./interface/INFT.sol";

/**
 * @title NFT in ERC-721 Non-Fungible Token Standard
 *
 * @dev functions defination please refer to INFT
 */
contract NFT is ERC721Enumerable, Ownable, ReentrancyGuard, INFT {
    using SafeERC20 for IERC20;

    uint256 public immutable MAX_SUPPLY = 10000;
    string public baseURI;
    mapping(address => bool) public crowdsales;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    modifier onlyCrowdsale() {
        require(crowdsales[msg.sender], "NFT:onlyCrowdsale: only whitelisted & enabled crowdsale allowed");
        _;
    }

    function mint(uint256 tokenId, address user) external onlyCrowdsale {
        require(!_exists(tokenId), "NFT:mint: NFT has already been minted");
        if (tokenId < MAX_SUPPLY) {
            _safeMint(user, tokenId);
        }
    }

    function isMinted(uint256 tokenId) external view returns (bool) {
        require(tokenId < MAX_SUPPLY, "NFT:isMinted: tokenId outside collection bounds");
        return _exists(tokenId);
    }

    function enableCrowdsale(address crowdsale) external onlyOwner {
        crowdsales[crowdsale] = true;
    }

    function disableCrowdsale(address crowdsale) external onlyOwner {
        crowdsales[crowdsale] = false;
    }

    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
