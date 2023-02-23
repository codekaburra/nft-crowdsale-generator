import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CrowdsaleCreated } from "../generated/schema"
import { CrowdsaleCreated as CrowdsaleCreatedEvent } from "../generated/NFTCrowdsaleGenerator/NFTCrowdsaleGenerator"
import { handleCrowdsaleCreated } from "../src/nft-crowdsale-generator"
import { createCrowdsaleCreatedEvent } from "./nft-crowdsale-generator-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let crowdsale = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let nft = Address.fromString("0x0000000000000000000000000000000000000001")
    let arrayIndex = BigInt.fromI32(234)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let newCrowdsaleCreatedEvent = createCrowdsaleCreatedEvent(
      crowdsale,
      nft,
      arrayIndex,
      owner
    )
    handleCrowdsaleCreated(newCrowdsaleCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CrowdsaleCreated created and stored", () => {
    assert.entityCount("CrowdsaleCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CrowdsaleCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "crowdsale",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CrowdsaleCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nft",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CrowdsaleCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "arrayIndex",
      "234"
    )
    assert.fieldEquals(
      "CrowdsaleCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
