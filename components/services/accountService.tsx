import { bze } from "@bze/bzejs"
import { QueryBalanceResponseSDKType } from "@bze/bzejs/types/codegen/cosmos/bank/v1beta1/query";
import { getRestUrl, getMinDenom } from "../../config"

export const getAccountBalance = async (address: string): Promise<QueryBalanceResponseSDKType> => {
    const client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()});
    
    return client.cosmos.bank.v1beta1.balance({
        address: address,
        denom: getMinDenom()
    })
}