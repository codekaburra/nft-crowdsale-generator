// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "./interfaces/INFTCrowdsaleGenerator.sol";
import "./NFTCrowdsale.sol";
import "./NFT.sol";

contract NFTCrowdsaleGenerator is INFTCrowdsaleGenerator {
    mapping(address => uint256) public indexes; // crowdsale address -> array index in crowdsales
    address[] public crowdsales;

    event CrowdsaleCreated(address indexed crowdsale, address indexed nft, uint256 indexed arrayIndex, address owner);

    constructor() {
        //
    }

    function crowdsalesLength() external view returns (uint) {
        return crowdsales.length;
    }

    function createCrowdsale(
        NFTConfig memory _nftConfig,
        address _paymentToken,
        SalePhrase[] memory _salePhrases
    ) external returns (uint256 arrayIndex, address nft, address crowdsale) {
        {
            bytes memory bytecode = type(NFT).creationCode;
            bytecode = abi.encodePacked(bytecode, abi.encode(_nftConfig.name, _nftConfig.symbol, _nftConfig.maxSupply));
            bytes32 salt = keccak256(abi.encodePacked(bytecode, crowdsales.length));
            assembly {
                nft := create2(0, add(bytecode, 32), mload(bytecode), salt)
            }
        }
        {
            bytes memory bytecode = type(NFTCrowdsale).creationCode;
            bytecode = abi.encodePacked(bytecode, abi.encode(_paymentToken, nft, _salePhrases));
            bytes32 salt = keccak256(abi.encodePacked(bytecode, nft, crowdsales.length));
            assembly {
                crowdsale := create2(0, add(bytecode, 32), mload(bytecode), salt)
            }
        }

        arrayIndex = crowdsales.length;
        indexes[crowdsale] = arrayIndex;
        crowdsales.push(crowdsale);
        NFT(nft).transferOwnership(msg.sender);
        NFTCrowdsale(crowdsale).transferOwnership(msg.sender);
        emit CrowdsaleCreated(crowdsale, nft, arrayIndex, msg.sender);
    }
}
