import { bze } from '@bze/bzejs';
import { getRestUrl } from '../../config';
import { QueryParamsResponseSDKType } from "@bze/bzejs/types/codegen/beezee/cointrunk/query";
import Long from 'long';

const LOCAL_STORAGE_KEY = 'cointrunk:params';
const LOCAL_CACHE_TTL = 1000 * 60 * 30; //30 minutes

export const getCointrunkParams = async (): Promise<QueryParamsResponseSDKType> => {
    let localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (null !== localData) {
        let parsed = JSON.parse(localData);
        if (parsed) {
            if (parsed.expiresAt > new Date().getTime()) {
                
                return new Promise<QueryParamsResponseSDKType> ((resolve) => {
                    resolve({...parsed.params});
                })
            }
        }
    }

    let client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()});
    let response = await client.bze.cointrunk.v1.params();
    let cacheData = {
        params: {...response},
        expiresAt: new Date().getTime() + LOCAL_CACHE_TTL,
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cacheData));

    return new Promise<QueryParamsResponseSDKType> ((resolve) => {
        resolve(response);
    })
}

export const getAnonArticleLimit = async (): Promise<number> => {
    let params = await getCointrunkParams();
    if (params.params === undefined) {
        return 0;
    } 
    
    return Long.fromValue(params.params.anon_article_limit).toNumber();
}

export const getAnonArticleCost = async (): Promise<Long> => {
    let params = await getCointrunkParams();
    if (params.params === undefined || params.params.anon_article_cost === undefined) {
        return Long.UZERO;
    } 
    
    return Long.fromValue(params.params.anon_article_cost.amount);
}
