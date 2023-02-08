import { getRestUrl } from '../../config';
import { bze } from '@bze/bzejs';
import { QueryAllArticlesResponseSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import { PageRequest } from '@bze/bzejs/types/codegen/cosmos/base/query/v1beta1/pagination';

export const getAllArticles = async (pagination: PageRequest): Promise<QueryAllArticlesResponseSDKType|undefined> => {
    let client  = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()})

    return new Promise<QueryAllArticlesResponseSDKType|undefined>((resolve) => { 
        resolve(client.bze.cointrunk.v1.allArticles({pagination: pagination}));
      });
}