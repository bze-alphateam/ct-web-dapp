import { restUrl } from '../../config';
import { bze } from '@bze/bzejs';
import { QueryAllArticlesResponseSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import { paginationDefaultParams } from '../services';

export const getAllArticles = async (): Promise<QueryAllArticlesResponseSDKType|undefined> => {
    let client  = await bze.ClientFactory.createLCDClient({restEndpoint: restUrl})

    return new Promise<QueryAllArticlesResponseSDKType|undefined>((resolve) => {
        resolve(client.bze.cointrunk.v1.allArticles({pagination: paginationDefaultParams()}));
      });
}