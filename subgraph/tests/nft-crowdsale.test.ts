import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { MintedNFTs } from "../generated/schema"
import { MintedNFTs as MintedNFTsEvent } from "../generated/NFTCrowdsale/NFTCrowdsale"
import { handleMintedNFTs } from "../src/nft-crowdsale"
import { createMintedNFTsEvent } from "./nft-crowdsale-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _salePhrase = 123
    let _address = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let numToMinted = BigInt.fromI32(234)
    let costToMint = BigInt.fromI32(234)
    let newMintedNFTsEvent = createMintedNFTsEvent(
      _salePhrase,
      _address,
      numToMinted,
      costToMint
    )
    handleMintedNFTs(newMintedNFTsEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MintedNFTs created and stored", () => {
    assert.entityCount("MintedNFTs", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MintedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_salePhrase",
      "123"
    )
    assert.fieldEquals(
      "MintedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_address",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MintedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "numToMinted",
      "234"
    )
    assert.fieldEquals(
      "MintedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "costToMint",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
