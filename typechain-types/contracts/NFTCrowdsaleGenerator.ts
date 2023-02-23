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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace INFTCrowdsaleGenerator {
  export type NFTConfigStruct = {
    name: PromiseOrValue<string>;
    symbol: PromiseOrValue<string>;
    maxSupply: PromiseOrValue<BigNumberish>;
  };

  export type NFTConfigStructOutput = [string, string, BigNumber] & {
    name: string;
    symbol: string;
    maxSupply: BigNumber;
  };

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

export interface NFTCrowdsaleGeneratorInterface extends utils.Interface {
  functions: {
    "createCrowdsale((string,string,uint256),address,(uint256,uint256,uint256,uint256,uint256,bytes32)[])": FunctionFragment;
    "crowdsales(uint256)": FunctionFragment;
    "crowdsalesLength()": FunctionFragment;
    "indexes(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawAsset(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createCrowdsale"
      | "crowdsales"
      | "crowdsalesLength"
      | "indexes"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
      | "withdrawAsset"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createCrowdsale",
    values: [
      INFTCrowdsaleGenerator.NFTConfigStruct,
      PromiseOrValue<string>,
      INFTCrowdsaleGenerator.SalePhraseStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "crowdsales",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "crowdsalesLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "indexes",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAsset",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createCrowdsale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "crowdsales", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "crowdsalesLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "indexes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAsset",
    data: BytesLike
  ): Result;

  events: {
    "CrowdsaleCreated(address,address,uint256,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CrowdsaleCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface CrowdsaleCreatedEventObject {
  crowdsale: string;
  nft: string;
  arrayIndex: BigNumber;
  owner: string;
}
export type CrowdsaleCreatedEvent = TypedEvent<
  [string, string, BigNumber, string],
  CrowdsaleCreatedEventObject
>;

export type CrowdsaleCreatedEventFilter =
  TypedEventFilter<CrowdsaleCreatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface NFTCrowdsaleGenerator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NFTCrowdsaleGeneratorInterface;

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
    createCrowdsale(
      _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
      _paymentToken: PromiseOrValue<string>,
      _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    crowdsales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    crowdsalesLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    indexes(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawAsset(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createCrowdsale(
    _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
    _paymentToken: PromiseOrValue<string>,
    _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  crowdsales(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  crowdsalesLength(overrides?: CallOverrides): Promise<BigNumber>;

  indexes(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawAsset(
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createCrowdsale(
      _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
      _paymentToken: PromiseOrValue<string>,
      _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string] & {
        arrayIndex: BigNumber;
        nft: string;
        crowdsale: string;
      }
    >;

    crowdsales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    crowdsalesLength(overrides?: CallOverrides): Promise<BigNumber>;

    indexes(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawAsset(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CrowdsaleCreated(address,address,uint256,address)"(
      crowdsale?: PromiseOrValue<string> | null,
      nft?: PromiseOrValue<string> | null,
      arrayIndex?: PromiseOrValue<BigNumberish> | null,
      owner?: null
    ): CrowdsaleCreatedEventFilter;
    CrowdsaleCreated(
      crowdsale?: PromiseOrValue<string> | null,
      nft?: PromiseOrValue<string> | null,
      arrayIndex?: PromiseOrValue<BigNumberish> | null,
      owner?: null
    ): CrowdsaleCreatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    createCrowdsale(
      _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
      _paymentToken: PromiseOrValue<string>,
      _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    crowdsales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    crowdsalesLength(overrides?: CallOverrides): Promise<BigNumber>;

    indexes(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawAsset(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createCrowdsale(
      _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
      _paymentToken: PromiseOrValue<string>,
      _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    crowdsales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    crowdsalesLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    indexes(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAsset(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}