import { CrowdsaleCreated as CrowdsaleCreatedEvent } from "../generated/NFTCrowdsaleGenerator/NFTCrowdsaleGenerator"
import { CrowdsaleCreated, NFT, NFTCrowdsale } from "../generated/schema"
import { NFTCrowdsale as NFTCrowdsaleTemplate, NFT as NFTTemplate } from "../generated/templates";
import { getOrCreateNFTCrowdsaleGenerator } from "./util";

export function handleCrowdsaleCreated(event: CrowdsaleCreatedEvent): void {
  NFTTemplate.create(event.params.nft)
  NFTCrowdsaleTemplate.create(event.params.crowdsale)

  let entity = new CrowdsaleCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.crowdsale = event.params.crowdsale
  entity.nft = event.params.nft
  entity.arrayIndex = event.params.arrayIndex
  entity.owner = event.params.owner
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  let nft = new NFT(event.params.nft)
  nft.crowdsales = []
  nft.save()

  let crowdsale = new NFTCrowdsale(
    event.params.crowdsale
  )
  crowdsale.generator = event.address;
  crowdsale.nft = nft.id
  crowdsale.arrayIndexAtGenerator = event.params.arrayIndex
  crowdsale.owner = event.params.owner
  crowdsale.save()

  nft.crowdsales.push(event.params.crowdsale)
  nft.save()

  let generator = getOrCreateNFTCrowdsaleGenerator(event.address);
}
