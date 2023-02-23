/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace INFTCrowdsale {
  export type SalePhraseStruct = {
    startTime: PromiseOrValue<BigNumberish>;
    durationInSec: PromiseOrValue<BigNumberish>;
    maxMintableNFTs: PromiseOrValue<BigNumberish>;
    maxMintableNFTsPerAddress: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    whitelistedMerklRoot: PromiseOrValue<BytesLike>;
  };

  export type SalePhraseStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    startTime: BigNumber;
    durationInSec: BigNumber;
    maxMintableNFTs: BigNumber;
    maxMintableNFTsPerAddress: BigNumber;
    price: BigNumber;
    whitelistedMerklRoot: string;
  };
}

export interface INFTCrowdsaleInterface extends utils.Interface {
  functions: {
    "getCurrentOrComingSalePhrase()": FunctionFragment;
    "getMintPrice(uint8)": FunctionFragment;
    "getSalePhrase(uint8)": FunctionFragment;
    "getUserMintedTokens(address)": FunctionFragment;
    "isSaleActive(uint8)": FunctionFragment;
    "isWhitelistedAddress(address,bytes32[],uint8)": FunctionFragment;
    "mintNFTs(uint256,bytes32[])": FunctionFragment;
    "mintRemainingNFTs()": FunctionFragment;
    "nft()": FunctionFragment;
    "numOfMintedNFTs(uint8)": FunctionFragment;
    "paymentToken()": FunctionFragment;
    "updateSalePhrase((uint256,uint256,uint256,uint256,uint256,bytes32),uint8)": FunctionFragment;
    "userMintedTokens(address,uint256)": FunctionFragment;
    "userMintedTokensLength(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getCurrentOrComingSalePhrase"
      | "getMintPrice"
      | "getSalePhrase"
      | "getUserMintedTokens"
      | "isSaleActive"
      | "isWhitelistedAddress"
      | "mintNFTs"
      | "mintRemainingNFTs"
      | "nft"
      | "numOfMintedNFTs"
      | "paymentToken"
      | "updateSalePhrase"
      | "userMintedTokens"
      | "userMintedTokensLength"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getCurrentOrComingSalePhrase",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMintPrice",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSalePhrase",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserMintedTokens",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isSaleActive",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhitelistedAddress",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "mintNFTs",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "mintRemainingNFTs",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nft", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "numOfMintedNFTs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "paymentToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateSalePhrase",
    values: [INFTCrowdsale.SalePhraseStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "userMintedTokens",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "userMintedTokensLength",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getCurrentOrComingSalePhrase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMintPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSalePhrase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserMintedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSaleActive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelistedAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintNFTs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintRemainingNFTs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numOfMintedNFTs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "paymentToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSalePhrase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userMintedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userMintedTokensLength",
    data: BytesLike
  ): Result;

  events: {};
}

export interface INFTCrowdsale extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: INFTCrowdsaleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getCurrentOrComingSalePhrase(
      overrides?: CallOverrides
    ): Promise<[number] & { currentOrComingSalePhrase: number }>;

    getMintPrice(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSalePhrase(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[INFTCrowdsale.SalePhraseStructOutput]>;

    getUserMintedTokens(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { tokenIds: BigNumber[] }>;

    isSaleActive(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isWhitelistedAddress(
      _address: PromiseOrValue<string>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mintNFTs(
      _numToAdopt: PromiseOrValue<BigNumberish>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintRemainingNFTs(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nft(overrides?: CallOverrides): Promise<[string]>;

    numOfMintedNFTs(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { num: BigNumber }>;

    paymentToken(overrides?: CallOverrides): Promise<[string]>;

    updateSalePhrase(
      sale: INFTCrowdsale.SalePhraseStruct,
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    userMintedTokens(
      _address: PromiseOrValue<string>,
      _arrayIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { tokenId: BigNumber }>;

    userMintedTokensLength(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { numOfTokens: BigNumber }>;
  };

  getCurrentOrComingSalePhrase(overrides?: CallOverrides): Promise<number>;

  getMintPrice(
    _salePhraseIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSalePhrase(
    salePhraseIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<INFTCrowdsale.SalePhraseStructOutput>;

  getUserMintedTokens(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  isSaleActive(
    _salePhraseIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isWhitelistedAddress(
    _address: PromiseOrValue<string>,
    _merkleProof: PromiseOrValue<BytesLike>[],
    _salePhraseIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mintNFTs(
    _numToAdopt: PromiseOrValue<BigNumberish>,
    _merkleProof: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintRemainingNFTs(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nft(overrides?: CallOverrides): Promise<string>;

  numOfMintedNFTs(
    salePhraseIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  paymentToken(overrides?: CallOverrides): Promise<string>;

  updateSalePhrase(
    sale: INFTCrowdsale.SalePhraseStruct,
    _salePhraseIndex: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  userMintedTokens(
    _address: PromiseOrValue<string>,
    _arrayIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  userMintedTokensLength(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    getCurrentOrComingSalePhrase(overrides?: CallOverrides): Promise<number>;

    getMintPrice(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSalePhrase(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<INFTCrowdsale.SalePhraseStructOutput>;

    getUserMintedTokens(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    isSaleActive(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isWhitelistedAddress(
      _address: PromiseOrValue<string>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mintNFTs(
      _numToAdopt: PromiseOrValue<BigNumberish>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    mintRemainingNFTs(overrides?: CallOverrides): Promise<BigNumber>;

    nft(overrides?: CallOverrides): Promise<string>;

    numOfMintedNFTs(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    paymentToken(overrides?: CallOverrides): Promise<string>;

    updateSalePhrase(
      sale: INFTCrowdsale.SalePhraseStruct,
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    userMintedTokens(
      _address: PromiseOrValue<string>,
      _arrayIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userMintedTokensLength(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getCurrentOrComingSalePhrase(overrides?: CallOverrides): Promise<BigNumber>;

    getMintPrice(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSalePhrase(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserMintedTokens(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isSaleActive(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isWhitelistedAddress(
      _address: PromiseOrValue<string>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintNFTs(
      _numToAdopt: PromiseOrValue<BigNumberish>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintRemainingNFTs(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nft(overrides?: CallOverrides): Promise<BigNumber>;

    numOfMintedNFTs(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    paymentToken(overrides?: CallOverrides): Promise<BigNumber>;

    updateSalePhrase(
      sale: INFTCrowdsale.SalePhraseStruct,
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    userMintedTokens(
      _address: PromiseOrValue<string>,
      _arrayIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userMintedTokensLength(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getCurrentOrComingSalePhrase(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMintPrice(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSalePhrase(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserMintedTokens(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSaleActive(
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isWhitelistedAddress(
      _address: PromiseOrValue<string>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintNFTs(
      _numToAdopt: PromiseOrValue<BigNumberish>,
      _merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintRemainingNFTs(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numOfMintedNFTs(
      salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    paymentToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateSalePhrase(
      sale: INFTCrowdsale.SalePhraseStruct,
      _salePhraseIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    userMintedTokens(
      _address: PromiseOrValue<string>,
      _arrayIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userMintedTokensLength(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}