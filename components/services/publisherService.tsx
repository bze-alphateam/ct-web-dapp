
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import { bze } from '@bze/bzejs';
import { getRestUrl } from '../../config';
import { LocallyCachedPublisher } from '../types';
import { QueryPublisherResponseSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import { paginationDefaultParams } from './paginationService';

const LOCAL_STORAGE_PUBLISHER_PREFIX = 'publisher:'

export const getPublisherData = async (publisher: string): Promise<PublisherSDKType|undefined> => {
  let localStorageKey = LOCAL_STORAGE_PUBLISHER_PREFIX + publisher;
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
  
  const client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()});
  const publisherResponse = await client.bze.cointrunk.v1.publisherByIndex({index: publisher});
  
  if (publisherResponse.publisher) {
    let cachePublisher = LocallyCachedPublisher.fromPublisher(publisherResponse.publisher);
    localStorage.setItem(localStorageKey, JSON.stringify(cachePublisher.toJSON()));
  }
  
  return new Promise<PublisherSDKType|undefined>((resolve) => {
    resolve(publisherResponse?.publisher);
  });
}

export const clearPublisherFromLocalStorage = (address: string) => {
  let localStorageKey = LOCAL_STORAGE_PUBLISHER_PREFIX + address;
  let localData = localStorage.getItem(localStorageKey);
  if (null !== localData) {
    localStorage.removeItem(localStorageKey);
  }
}

export const getAllPublishers = async (): Promise<QueryPublisherResponseSDKType|undefined> => {
  let client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()})

  return new Promise<QueryPublisherResponseSDKType|undefined>((resolve) => {
        resolve(client.bze.cointrunk.v1.publisher({pagination: paginationDefaultParams()}));
  });
}