import { Address } from "@graphprotocol/graph-ts";
import { NFTCrowdsaleGenerator } from "../generated/schema"

export function getOrCreateNFTCrowdsaleGenerator(id: Address): NFTCrowdsaleGenerator {
  let generator = NFTCrowdsaleGenerator.load(id);
  if (generator === null) {
    generator = new NFTCrowdsaleGenerator(id);
    generator.crowdsales = [];
    generator.save();
  }
  return generator as NFTCrowdsaleGenerator;
}
