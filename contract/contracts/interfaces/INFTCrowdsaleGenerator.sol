// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "./INFTCrowdsale.sol";

/**
 * @notice Crowdsale of NFT
 */
interface INFTCrowdsaleGenerator {
    struct NFTConfig {
        string name;
        string symbol;
        uint256 maxSupply;
    }
    struct SalePhrase {
        uint256 startTime;
        uint256 durationInSec;
        uint256 maxMintableNFTs; // total allowable mint amount in this phrase
        uint256 maxMintableNFTsPerAddress;
        uint256 price;
        bytes32 whitelistedMerklRoot;
    }

    function indexes(address crowdsale) external view returns (uint256);

    function crowdsalesLength() external view returns (uint256);

    function createCrowdsale(
        NFTConfig memory _nftConfig,
        address _paymentToken,
        SalePhrase[] memory _salePhrases
    ) external returns (uint256 arrayIndex, address nft, address crowdsale);
}
