
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import { bze } from '@bze/bzejs';
import { restUrl } from '../../config';
import { LocallyCachedPublisher } from '../types';

export const getPublisherData = async (publisher: string): Promise<PublisherSDKType|undefined> => {
    let localStorageKey = 'publisher:' + publisher;
    let localData = localStorage.getItem(localStorageKey);
    if (null !== localData) {
      let cachedPublisher = LocallyCachedPublisher.fromString(localData);
      
      if (!cachedPublisher?.isExpired()) {
        
        return new Promise<PublisherSDKType|undefined> ((resolve) => {
          resolve(cachedPublisher?.getPublisher());
        });
      }
      
      localStorage.removeItem(localStorageKey);
    }
    
    const client = await bze.ClientFactory.createLCDClient({restEndpoint: restUrl});
    const publisherResponse = await client.bze.cointrunk.v1.publisherByIndex({index: publisher});
    
    if (publisherResponse.publisher) {
      let cachePublisher = LocallyCachedPublisher.fromPublisher(publisherResponse.publisher);
      localStorage.setItem(localStorageKey, JSON.stringify(cachePublisher.toJSON()));
    }
    
    return new Promise<PublisherSDKType|undefined>((resolve) => {
      resolve(publisherResponse?.publisher);
    });
  }