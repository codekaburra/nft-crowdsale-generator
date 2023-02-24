import {
  MintedNFTs as MintedNFTsEvent,
  MintedRemainingNFTs as MintedRemainingNFTsEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SetSale as SetSaleEvent
} from "../../subgraph/generated/templates/NFTCrowdsale/NFTCrowdsale"
import {
  MintedNFTs,
  MintedRemainingNFTs,
  CrowdsaleOwnershipTransferred,
  SetSale,
  NFTCrowdsale,
  NFTCrowdsaleSalePhrase
} from "../../subgraph/generated/schema"

export function handleMintedNFTs(event: MintedNFTsEvent): void {
  // TODO tag NFT , crowdsale
  let entity = new MintedNFTs(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._salePhrase = event.params._salePhrase
  entity._address = event.params._address
  entity.numToMinted = event.params.numToMinted
  entity.costToMint = event.params.costToMint

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintedRemainingNFTs(
  event: MintedRemainingNFTsEvent
): void {
  let entity = new MintedRemainingNFTs(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address
  entity.numToMinted = event.params.numToMinted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new CrowdsaleOwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetSale(event: SetSaleEvent): void {
  let entity = new SetSale(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.salePhraseIndex = event.params.salePhraseIndex
  entity.startTime = event.params.startTime
  entity.durationInSec = event.params.durationInSec
  entity.maxMintableNFTs = event.params.maxMintableNFTs
  entity.maxMintableNFTsPerAddress = event.params.maxMintableNFTsPerAddress
  entity.price = event.params.price
  entity.whitelistedMerklRoot = event.params.whitelistedMerklRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()


  let crowdsale = NFTCrowdsale.load(event.address) as NFTCrowdsale;

  let salePhraseId = crowdsale.id.concatI32(event.params.salePhraseIndex)
  let salePhrase = (NFTCrowdsaleSalePhrase.load(salePhraseId) || new NFTCrowdsaleSalePhrase(salePhraseId)) as NFTCrowdsaleSalePhrase
  salePhrase.crowdsale = crowdsale.id
  salePhrase.salePhraseIndex = event.params.salePhraseIndex
  salePhrase.startTime = event.params.startTime
  salePhrase.durationInSec = event.params.durationInSec
  salePhrase.maxMintableNFTs = event.params.maxMintableNFTs
  salePhrase.maxMintableNFTsPerAddress = event.params.maxMintableNFTsPerAddress
  salePhrase.price = event.params.price
  salePhrase.whitelistedMerklRoot = event.params.whitelistedMerklRoot
  salePhrase.save()

}
