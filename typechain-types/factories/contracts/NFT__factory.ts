/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { NFT, NFTInterface } from "../../contracts/NFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "crowdsales",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "crowdsale",
        type: "address",
      },
    ],
    name: "disableCrowdsale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "crowdsale",
        type: "address",
      },
    ],
    name: "enableCrowdsale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "isMinted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040526127106080523480156200001757600080fd5b506040516200221b3803806200221b8339810160408190526200003a916200025c565b81518290829062000053906000906020850190620000e9565b50805162000069906001906020840190620000e9565b50505062000086620000806200009360201b60201c565b62000097565b50506001600b5562000303565b3390565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000f790620002c6565b90600052602060002090601f0160209004810192826200011b576000855562000166565b82601f106200013657805160ff191683800117855562000166565b8280016001018555821562000166579182015b828111156200016657825182559160200191906001019062000149565b506200017492915062000178565b5090565b5b8082111562000174576000815560010162000179565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001b757600080fd5b81516001600160401b0380821115620001d457620001d46200018f565b604051601f8301601f19908116603f01168101908282118183101715620001ff57620001ff6200018f565b816040528381526020925086838588010111156200021c57600080fd5b600091505b8382101562000240578582018301518183018401529082019062000221565b83821115620002525760008385830101525b9695505050505050565b600080604083850312156200027057600080fd5b82516001600160401b03808211156200028857600080fd5b6200029686838701620001a5565b93506020850151915080821115620002ad57600080fd5b50620002bc85828601620001a5565b9150509250929050565b600181811c90821680620002db57607f821691505b60208210811415620002fd57634e487b7160e01b600052602260045260246000fd5b50919050565b608051611eee6200032d6000396000818161034f015281816107820152610bf70152611eee6000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80636c0360eb116100f9578063a22cb46511610097578063c87b56dd11610071578063c87b56dd14610384578063dd1e2e0f14610397578063e985e9c5146103ba578063f2fde38b146103f657600080fd5b8063a22cb46514610337578063acf75f0c1461034a578063b88d4fde1461037157600080fd5b80638ca6b72f116100d35780638ca6b72f146102f85780638da5cb5b1461030b57806394bf804d1461031c57806395d89b411461032f57600080fd5b80636c0360eb146102d557806370a08231146102dd578063715018a6146102f057600080fd5b8063291d64901161016657806342842e0e1161014057806342842e0e146102895780634f6ccce71461029c57806355f804b3146102af5780636352211e146102c257600080fd5b8063291d6490146102505780632f745c591461026357806333c41a901461027657600080fd5b806301ffc9a7146101ae57806306fdde03146101d6578063081812fc146101eb578063095ea7b31461021657806318160ddd1461022b57806323b872dd1461023d575b600080fd5b6101c16101bc366004611931565b610409565b60405190151581526020015b60405180910390f35b6101de610434565b6040516101cd91906119a6565b6101fe6101f93660046119b9565b6104c6565b6040516001600160a01b0390911681526020016101cd565b6102296102243660046119ee565b610553565b005b6008545b6040519081526020016101cd565b61022961024b366004611a18565b610669565b61022961025e366004611a54565b61069a565b61022f6102713660046119ee565b6106e8565b6101c16102843660046119b9565b61077e565b610229610297366004611a18565b610810565b61022f6102aa3660046119b9565b61082b565b6102296102bd366004611afb565b6108be565b6101fe6102d03660046119b9565b6108ff565b6101de610976565b61022f6102eb366004611a54565b610a04565b610229610a8b565b610229610306366004611a54565b610ac1565b600a546001600160a01b03166101fe565b61022961032a366004611b44565b610b0c565b6101de610c27565b610229610345366004611b70565b610c36565b61022f7f000000000000000000000000000000000000000000000000000000000000000081565b61022961037f366004611bac565b610c41565b6101de6103923660046119b9565b610c79565b6101c16103a5366004611a54565b600d6020526000908152604090205460ff1681565b6101c16103c8366004611c28565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b610229610404366004611a54565b610d44565b60006001600160e01b0319821663780e9d6360e01b148061042e575061042e82610ddf565b92915050565b60606000805461044390611c52565b80601f016020809104026020016040519081016040528092919081815260200182805461046f90611c52565b80156104bc5780601f10610491576101008083540402835291602001916104bc565b820191906000526020600020905b81548152906001019060200180831161049f57829003601f168201915b5050505050905090565b60006104d182610e2f565b6105375760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061055e826108ff565b9050806001600160a01b0316836001600160a01b031614156105cc5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161052e565b336001600160a01b03821614806105e857506105e881336103c8565b61065a5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161052e565b6106648383610e4c565b505050565b6106733382610eba565b61068f5760405162461bcd60e51b815260040161052e90611c8d565b610664838383610fa4565b600a546001600160a01b031633146106c45760405162461bcd60e51b815260040161052e90611cde565b6001600160a01b03166000908152600d60205260409020805460ff19166001179055565b60006106f383610a04565b82106107555760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b606482015260840161052e565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b60007f000000000000000000000000000000000000000000000000000000000000000082106108075760405162461bcd60e51b815260206004820152602f60248201527f4e46543a69734d696e7465643a20746f6b656e4964206f75747369646520636f60448201526e6c6c656374696f6e20626f756e647360881b606482015260840161052e565b61042e82610e2f565b61066483838360405180602001604052806000815250610c41565b600061083660085490565b82106108995760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b606482015260840161052e565b600882815481106108ac576108ac611d13565b90600052602060002001549050919050565b600a546001600160a01b031633146108e85760405162461bcd60e51b815260040161052e90611cde565b80516108fb90600c906020840190611882565b5050565b6000818152600260205260408120546001600160a01b03168061042e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161052e565b600c805461098390611c52565b80601f01602080910402602001604051908101604052809291908181526020018280546109af90611c52565b80156109fc5780601f106109d1576101008083540402835291602001916109fc565b820191906000526020600020905b8154815290600101906020018083116109df57829003601f168201915b505050505081565b60006001600160a01b038216610a6f5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161052e565b506001600160a01b031660009081526003602052604090205490565b600a546001600160a01b03163314610ab55760405162461bcd60e51b815260040161052e90611cde565b610abf600061114f565b565b600a546001600160a01b03163314610aeb5760405162461bcd60e51b815260040161052e90611cde565b6001600160a01b03166000908152600d60205260409020805460ff19169055565b336000908152600d602052604090205460ff16610b915760405162461bcd60e51b815260206004820152603f60248201527f4e46543a6f6e6c7943726f776473616c653a206f6e6c792077686974656c697360448201527f746564202620656e61626c65642063726f776473616c6520616c6c6f77656400606482015260840161052e565b610b9a82610e2f565b15610bf55760405162461bcd60e51b815260206004820152602560248201527f4e46543a6d696e743a204e46542068617320616c7265616479206265656e206d6044820152641a5b9d195960da1b606482015260840161052e565b7f00000000000000000000000000000000000000000000000000000000000000008210156108fb576108fb81836111a1565b60606001805461044390611c52565b6108fb3383836111bb565b610c4b3383610eba565b610c675760405162461bcd60e51b815260040161052e90611c8d565b610c738484848461128a565b50505050565b6060610c8482610e2f565b610ce85760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b606482015260840161052e565b6000610cf26112bd565b90506000815111610d125760405180602001604052806000815250610d3d565b80610d1c846112cc565b604051602001610d2d929190611d29565b6040516020818303038152906040525b9392505050565b600a546001600160a01b03163314610d6e5760405162461bcd60e51b815260040161052e90611cde565b6001600160a01b038116610dd35760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161052e565b610ddc8161114f565b50565b60006001600160e01b031982166380ac58cd60e01b1480610e1057506001600160e01b03198216635b5e139f60e01b145b8061042e57506301ffc9a760e01b6001600160e01b031983161461042e565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610e81826108ff565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610ec582610e2f565b610f265760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161052e565b6000610f31836108ff565b9050806001600160a01b0316846001600160a01b03161480610f6c5750836001600160a01b0316610f61846104c6565b6001600160a01b0316145b80610f9c57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610fb7826108ff565b6001600160a01b03161461101f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b606482015260840161052e565b6001600160a01b0382166110815760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161052e565b61108c8383836113ca565b611097600082610e4c565b6001600160a01b03831660009081526003602052604081208054600192906110c0908490611d6e565b90915550506001600160a01b03821660009081526003602052604081208054600192906110ee908490611d85565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6108fb828260405180602001604052806000815250611482565b816001600160a01b0316836001600160a01b0316141561121d5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161052e565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611295848484610fa4565b6112a1848484846114b5565b610c735760405162461bcd60e51b815260040161052e90611d9d565b6060600c805461044390611c52565b6060816112f05750506040805180820190915260018152600360fc1b602082015290565b8160005b811561131a578061130481611def565b91506113139050600a83611e20565b91506112f4565b60008167ffffffffffffffff81111561133557611335611a6f565b6040519080825280601f01601f19166020018201604052801561135f576020820181803683370190505b5090505b8415610f9c57611374600183611d6e565b9150611381600a86611e34565b61138c906030611d85565b60f81b8183815181106113a1576113a1611d13565b60200101906001600160f81b031916908160001a9053506113c3600a86611e20565b9450611363565b6001600160a01b0383166114255761142081600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611448565b816001600160a01b0316836001600160a01b0316146114485761144883826115b3565b6001600160a01b03821661145f5761066481611650565b826001600160a01b0316826001600160a01b0316146106645761066482826116ff565b61148c8383611743565b61149960008484846114b5565b6106645760405162461bcd60e51b815260040161052e90611d9d565b60006001600160a01b0384163b156115a857604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906114f9903390899088908890600401611e48565b6020604051808303816000875af1925050508015611534575060408051601f3d908101601f1916820190925261153191810190611e85565b60015b61158e573d808015611562576040519150601f19603f3d011682016040523d82523d6000602084013e611567565b606091505b5080516115865760405162461bcd60e51b815260040161052e90611d9d565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610f9c565b506001949350505050565b600060016115c084610a04565b6115ca9190611d6e565b60008381526007602052604090205490915080821461161d576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b60085460009061166290600190611d6e565b6000838152600960205260408120546008805493945090928490811061168a5761168a611d13565b9060005260206000200154905080600883815481106116ab576116ab611d13565b60009182526020808320909101929092558281526009909152604080822084905585825281205560088054806116e3576116e3611ea2565b6001900381819060005260206000200160009055905550505050565b600061170a83610a04565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160a01b0382166117995760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161052e565b6117a281610e2f565b156117ef5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161052e565b6117fb600083836113ca565b6001600160a01b0382166000908152600360205260408120805460019290611824908490611d85565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b82805461188e90611c52565b90600052602060002090601f0160209004810192826118b057600085556118f6565b82601f106118c957805160ff19168380011785556118f6565b828001600101855582156118f6579182015b828111156118f65782518255916020019190600101906118db565b50611902929150611906565b5090565b5b808211156119025760008155600101611907565b6001600160e01b031981168114610ddc57600080fd5b60006020828403121561194357600080fd5b8135610d3d8161191b565b60005b83811015611969578181015183820152602001611951565b83811115610c735750506000910152565b6000815180845261199281602086016020860161194e565b601f01601f19169290920160200192915050565b602081526000610d3d602083018461197a565b6000602082840312156119cb57600080fd5b5035919050565b80356001600160a01b03811681146119e957600080fd5b919050565b60008060408385031215611a0157600080fd5b611a0a836119d2565b946020939093013593505050565b600080600060608486031215611a2d57600080fd5b611a36846119d2565b9250611a44602085016119d2565b9150604084013590509250925092565b600060208284031215611a6657600080fd5b610d3d826119d2565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611aa057611aa0611a6f565b604051601f8501601f19908116603f01168101908282118183101715611ac857611ac8611a6f565b81604052809350858152868686011115611ae157600080fd5b858560208301376000602087830101525050509392505050565b600060208284031215611b0d57600080fd5b813567ffffffffffffffff811115611b2457600080fd5b8201601f81018413611b3557600080fd5b610f9c84823560208401611a85565b60008060408385031215611b5757600080fd5b82359150611b67602084016119d2565b90509250929050565b60008060408385031215611b8357600080fd5b611b8c836119d2565b915060208301358015158114611ba157600080fd5b809150509250929050565b60008060008060808587031215611bc257600080fd5b611bcb856119d2565b9350611bd9602086016119d2565b925060408501359150606085013567ffffffffffffffff811115611bfc57600080fd5b8501601f81018713611c0d57600080fd5b611c1c87823560208401611a85565b91505092959194509250565b60008060408385031215611c3b57600080fd5b611c44836119d2565b9150611b67602084016119d2565b600181811c90821680611c6657607f821691505b60208210811415611c8757634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60008351611d3b81846020880161194e565b835190830190611d4f81836020880161194e565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611d8057611d80611d58565b500390565b60008219821115611d9857611d98611d58565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000600019821415611e0357611e03611d58565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611e2f57611e2f611e0a565b500490565b600082611e4357611e43611e0a565b500690565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611e7b9083018461197a565b9695505050505050565b600060208284031215611e9757600080fd5b8151610d3d8161191b565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220e56d28c10907a45b2f3e87f9067e2d590573858491ab8b0ed86085317207225c64736f6c634300080b0033";

type NFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFT__factory extends ContractFactory {
  constructor(...args: NFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFT> {
    return super.deploy(_name, _symbol, overrides || {}) as Promise<NFT>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override attach(address: string): NFT {
    return super.attach(address) as NFT;
  }
  override connect(signer: Signer): NFT__factory {
    return super.connect(signer) as NFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTInterface {
    return new utils.Interface(_abi) as NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NFT {
    return new Contract(address, _abi, signerOrProvider) as NFT;
  }
}