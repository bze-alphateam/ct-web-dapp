
import { PageRequest } from '@bze/bzejs/types/codegen/cosmos/base/query/v1beta1/pagination';
import Long from 'long';

export const paginationDefaultParams = (): PageRequest => {
    return {
        key: new Uint8Array(),
        offset: Long.fromNumber(0),
        limit: Long.fromNumber(200),
        countTotal: true,
        reverse: true
    }
}

export const buildOptimalPagination = (limit: number, nextKey: Uint8Array|null): PageRequest => {
    
    return {
        key: nextKey ?? new Uint8Array(),
        offset: Long.ZERO,
        limit: Long.fromNumber(limit),
        countTotal: false,
        reverse: true
    }
}

export const buildLimitPagination = (limit: number, offset: number, countTotal: boolean = false) => {
    
    return {
        key: new Uint8Array(),
        offset: Long.fromNumber(offset),
        limit: Long.fromNumber(limit),
        countTotal: countTotal,
        reverse: true
    }
}