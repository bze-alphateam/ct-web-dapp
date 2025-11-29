
import {PageRequest} from "@bze/bzejs/cosmos/base/query/v1beta1/pagination";


export const paginationDefaultParams = (): PageRequest => {
    return {
        key: new Uint8Array(),
        offset: BigInt(0),
        limit: BigInt(200),
        countTotal: true,
        reverse: true
    }
}

export const buildOptimalPagination = (limit: number, nextKey: Uint8Array|null): PageRequest => {
    
    return {
        key: nextKey ?? new Uint8Array(),
        offset: BigInt(0),
        limit: BigInt(limit),
        countTotal: false,
        reverse: true
    }
}

export const buildLimitPagination = (limit: number, offset: number, countTotal: boolean = false) => {
    
    return {
        key: new Uint8Array(),
        offset: BigInt(offset),
        limit: BigInt(limit),
        countTotal: countTotal,
        reverse: true
    }
}