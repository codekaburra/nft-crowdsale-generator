import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  MintedNFTs,
  MintedRemainingNFTs,
  OwnershipTransferred,
  SetSale
} from "../../subgraph/generated/NFTCrowdsale/NFTCrowdsale"

export function createMintedNFTsEvent(
  _salePhrase: i32,
  _address: Address,
  numToMinted: BigInt,
  costToMint: BigInt
): MintedNFTs {
  let mintedNfTsEvent = changetype<MintedNFTs>(newMockEvent())

  mintedNfTsEvent.parameters = new Array()

  mintedNfTsEvent.parameters.push(
    new ethereum.EventParam(
      "_salePhrase",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_salePhrase))
    )
  )
  mintedNfTsEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )
  mintedNfTsEvent.parameters.push(
    new ethereum.EventParam(
      "numToMinted",
      ethereum.Value.fromUnsignedBigInt(numToMinted)
    )
  )
  mintedNfTsEvent.parameters.push(
    new ethereum.EventParam(
      "costToMint",
      ethereum.Value.fromUnsignedBigInt(costToMint)
    )
  )

  return mintedNfTsEvent
}

export function createMintedRemainingNFTsEvent(
  _address: Address,
  numToMinted: BigInt
): MintedRemainingNFTs {
  let mintedRemainingNfTsEvent = changetype<MintedRemainingNFTs>(newMockEvent())

  mintedRemainingNfTsEvent.parameters = new Array()

  mintedRemainingNfTsEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )
  mintedRemainingNfTsEvent.parameters.push(
    new ethereum.EventParam(
      "numToMinted",
      ethereum.Value.fromUnsignedBigInt(numToMinted)
    )
  )

  return mintedRemainingNfTsEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSetSaleEvent(
  salePhraseIndex: i32,
  startTime: BigInt,
  durationInSec: BigInt,
  maxMintableNFTs: BigInt,
  maxMintableNFTsPerAddress: BigInt,
  price: BigInt,
  whitelistedMerklRoot: Bytes
): SetSale {
  let setSaleEvent = changetype<SetSale>(newMockEvent())

  setSaleEvent.parameters = new Array()

  setSaleEvent.parameters.push(
    new ethereum.EventParam(
      "salePhraseIndex",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(salePhraseIndex))
    )
  )
  setSaleEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  setSaleEvent.parameters.push(
    new ethereum.EventParam(
      "durationInSec",
      ethereum.Value.fromUnsignedBigInt(durationInSec)
    )
  )
  setSaleEvent.parameters.push(
    new ethereum.EventParam(
      "maxMintableNFTs",
      ethereum.Value.fromUnsignedBigInt(maxMintableNFTs)
    )
  )
  setSaleEvent.parameters.push(
    new ethereum.EventParam(
      "maxMintableNFTsPerAddress",
      ethereum.Value.fromUnsignedBigInt(maxMintableNFTsPerAddress)
    )
  )
  setSaleEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  setSaleEvent.parameters.push(
    new ethereum.EventParam(
      "whitelistedMerklRoot",
      ethereum.Value.fromFixedBytes(whitelistedMerklRoot)
    )
  )

  return setSaleEvent
}
