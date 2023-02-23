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

export interface INFTCrowdsaleGeneratorInterface extends utils.Interface {
  functions: {
    "createCrowdsale((string,string,uint256),address,(uint256,uint256,uint256,uint256,uint256,bytes32)[])": FunctionFragment;
    "crowdsalesLength()": FunctionFragment;
    "indexes(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "createCrowdsale" | "crowdsalesLength" | "indexes"
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
    functionFragment: "crowdsalesLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "indexes",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createCrowdsale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "crowdsalesLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "indexes", data: BytesLike): Result;

  events: {};
}

export interface INFTCrowdsaleGenerator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: INFTCrowdsaleGeneratorInterface;

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

    crowdsalesLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    indexes(
      crowdsale: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  createCrowdsale(
    _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
    _paymentToken: PromiseOrValue<string>,
    _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  crowdsalesLength(overrides?: CallOverrides): Promise<BigNumber>;

  indexes(
    crowdsale: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

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

    crowdsalesLength(overrides?: CallOverrides): Promise<BigNumber>;

    indexes(
      crowdsale: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    createCrowdsale(
      _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
      _paymentToken: PromiseOrValue<string>,
      _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    crowdsalesLength(overrides?: CallOverrides): Promise<BigNumber>;

    indexes(
      crowdsale: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createCrowdsale(
      _nftConfig: INFTCrowdsaleGenerator.NFTConfigStruct,
      _paymentToken: PromiseOrValue<string>,
      _salePhrases: INFTCrowdsaleGenerator.SalePhraseStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    crowdsalesLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    indexes(
      crowdsale: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
