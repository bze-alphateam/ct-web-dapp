
import { Publisher } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import { bze } from '@bze/bzejs';
import { rpcUrl } from '../../config';
import { LocallyCachedPublisher } from '../types';

export const getPublisherData = async (publisher: string): Promise<Publisher|undefined> => {
    let localStorageKey = 'publisher:' + publisher;
    let localData = localStorage.getItem(localStorageKey);
    if (null !== localData) {
      let cachedPublisher = LocallyCachedPublisher.fromString(localData);
      if (!cachedPublisher?.isExpired()) {
        return new Promise<Publisher|undefined> ((resolve) => {
          resolve(cachedPublisher?.getPublisher());
        });
      }
      
      localStorage.removeItem(localStorageKey);
    }
    
    const client = await bze.ClientFactory.createRPCQueryClient({rpcEndpoint: rpcUrl});
    const publisherResponse = await client.bze.cointrunk.v1.publisherByIndex({index: publisher});
    if (publisherResponse.publisher) {
      let cachePublisher = LocallyCachedPublisher.fromPublisher(publisherResponse.publisher);
      localStorage.setItem(localStorageKey, JSON.stringify(cachePublisher.toJSON()));
    }
    
    return new Promise<Publisher|undefined>((resolve) => {
      resolve(publisherResponse?.publisher);
    });
  }