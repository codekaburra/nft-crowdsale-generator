import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { CrowdsaleCreated } from "../generated/NFTCrowdsaleGenerator/NFTCrowdsaleGenerator"

export function createCrowdsaleCreatedEvent(
  crowdsale: Address,
  nft: Address,
  arrayIndex: BigInt,
  owner: Address
): CrowdsaleCreated {
  let crowdsaleCreatedEvent = changetype<CrowdsaleCreated>(newMockEvent())

  crowdsaleCreatedEvent.parameters = new Array()

  crowdsaleCreatedEvent.parameters.push(
    new ethereum.EventParam("crowdsale", ethereum.Value.fromAddress(crowdsale))
  )
  crowdsaleCreatedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  crowdsaleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "arrayIndex",
      ethereum.Value.fromUnsignedBigInt(arrayIndex)
    )
  )
  crowdsaleCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return crowdsaleCreatedEvent
}
