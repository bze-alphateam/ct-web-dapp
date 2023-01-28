import { networks } from "./networks";

const CURRENT_NETWORK = 'testnet'; //or 'mainnet' or 'testnet' todo: move to .env

export const getChainName = (): string => {
    return networks[CURRENT_NETWORK].base.chainName;
}

export const getExplorerBaseUrl = (): string => {
    return networks[CURRENT_NETWORK].base.explorerBaseUrl;
}

export const getRpcUrl = (): string => {
    return networks[CURRENT_NETWORK].base.rpcUrl;
}

export const getRestUrl = (): string => {
    return networks[CURRENT_NETWORK].base.restUrl;
}

export const getChain = (): any => {
    return networks[CURRENT_NETWORK].chain;
}

export const getAssets = (): any => {
    return networks[CURRENT_NETWORK].assets;
}