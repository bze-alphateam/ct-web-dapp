import { bze } from "@bze/bzejs";
import { getRestUrl } from "../../config";
import { QueryAcceptedDomainResponseSDKType } from "@bze/bzejs/types/codegen/beezee/cointrunk/query";
import { AcceptedDomainSDKType } from "@bze/bzejs/types/codegen/beezee/cointrunk/accepted_domain";

const LOCAL_STORAGE_PREFIX = 'acceptedDomains:'
const LOCAL_CACHE_TTL = 1000 * 60 * 30; //30 minutes

export const getAcceptedDomains = async (): Promise<QueryAcceptedDomainResponseSDKType> => {
    let storageKey = LOCAL_STORAGE_PREFIX + 'all';
    let localData = localStorage.getItem(storageKey);
    if (null !== localData) {
        let parsed = JSON.parse(localData);
        if (parsed) {
            if (parsed.expiresAt > new Date().getTime()) {
                
                return new Promise<QueryAcceptedDomainResponseSDKType> ((resolve) => {
                    resolve({...parsed.acceptedDomainResponse});
                })
            }
        }
    }
    
    let client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()});
    let response = await client.bze.cointrunk.v1.acceptedDomain();
    let cacheData = {
        acceptedDomainResponse: {...response},
        expiresAt: new Date().getTime() + LOCAL_CACHE_TTL,
    }
    localStorage.setItem(storageKey, JSON.stringify(cacheData));

    return new Promise<QueryAcceptedDomainResponseSDKType> ((resolve) => {
        resolve(response);
    })
}

export const getActiveAcceptedDomains = async (): Promise<AcceptedDomainSDKType[]> => {
    let ad = await getAcceptedDomains();
    let filtered = ad.acceptedDomain.filter(ad => ad.active);

    return filtered;
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