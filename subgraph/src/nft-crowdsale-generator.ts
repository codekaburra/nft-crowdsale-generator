import { CrowdsaleCreated as CrowdsaleCreatedEvent } from "../generated/NFTCrowdsaleGenerator/NFTCrowdsaleGenerator"
import { CrowdsaleCreated } from "../generated/schema"

export function handleCrowdsaleCreated(event: CrowdsaleCreatedEvent): void {
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
}
