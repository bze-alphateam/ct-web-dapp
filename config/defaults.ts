import { networks } from "./networks";

const CURRENT_NETWORK: string = process.env.NEXT_PUBLIC_NETWORK ?? 'testnet'; //or 'mainnet' or 'testnet' todo: move to .env

export const getChainName = (): string => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].base.chainName;
}

export const getMinDenom = (): string => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].base.minDenom;
}

export const getExplorerBaseUrl = (): string => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].base.explorerBaseUrl;
}

export const getRpcUrl = (): string => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].base.rpcUrl;
}

export const getRestUrl = (): string => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].base.restUrl;
}

export const getChain = (): any => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].chain;
}

export const getAssets = (): any => {
    // @ts-ignore
    return networks[CURRENT_NETWORK].assets;
}

export const getMainAsset = (): any => {
    // @ts-ignore
    const list = getAssets().find((element: any) => {element.chain_name === networks[CURRENT_NETWORK].base.chainName});

    return list.assets.find((element: any) => {element.chain_name === getMinDenom()})
}

export const getExplorerTxUrl = (txHash: string) => {
    return getExplorerBaseUrl() + '/tx/' + txHash;
}