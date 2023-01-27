
import { PageRequest } from '@bze/bzejs/types/codegen/cosmos/base/query/v1beta1/pagination';
import Long from 'long';

export const paginationDefaultParams = (): PageRequest => {
    return {
        key: new Uint8Array(),
        offset: Long.fromNumber(0),
        limit: Long.fromNumber(200),
        countTotal: false,
        reverse: true
    }
}