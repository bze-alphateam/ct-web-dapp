import { bze } from "@bze/bzejs"
import { getRestUrl, getMinDenom } from "../../config"
import {QueryBalanceResponseSDKType} from "@bze/bzejs/cosmos/bank/v1beta1/query";

export const getAccountBalance = async (address: string): Promise<QueryBalanceResponseSDKType> => {
    const client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()});
    
    return client.cosmos.bank.v1beta1.balance({
        address: address,
        denom: getMinDenom()
    })
}