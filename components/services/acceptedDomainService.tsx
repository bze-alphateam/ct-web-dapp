import { bze } from "@bze/bzejs";
import { getRestUrl } from "../../config";
import { QueryAcceptedDomainResponseSDKType } from "@bze/bzejs/types/codegen/beezee/cointrunk/query";
import { AcceptedDomainSDKType } from "@bze/bzejs/types/codegen/beezee/cointrunk/accepted_domain";

export const getAcceptedDomains = async (): Promise<QueryAcceptedDomainResponseSDKType> => {
    let client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()});

    return client.bze.cointrunk.v1.acceptedDomain();
}

export const extractUrlHost = (url: string): string|null => {
    try {
        const urlObject = new URL(url);
        if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
            return null;
        }
        return urlObject.host;
    } catch (_) {
        return null;
    }
}

export const isAcceptedDomain = async (domain: string) => {
    let acceptedDomains = await getAcceptedDomains();
    let found = acceptedDomains.acceptedDomain.find((value: AcceptedDomainSDKType) => {
        return value.active && (value.domain === domain.toLowerCase());
    })

    return found !== undefined;
}