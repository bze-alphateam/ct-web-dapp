
import { bze } from '@bze/bzejs';
import { getRestUrl } from '../../config';
import { LocallyCachedPublisher } from '../types';
import { paginationDefaultParams } from './paginationService';
import {PublisherSDKType} from "@bze/bzejs/bze/cointrunk/store";
import {QueryPublishersResponseSDKType} from "@bze/bzejs/bze/cointrunk/query";

const LOCAL_STORAGE_PUBLISHER_PREFIX = 'publisher:'

export const isPublisher = async (address: string): Promise<boolean> => {
  try {
    const data = await getPublisherData(address);
    if (data === undefined) {
        return false;
    }
  
    return data.active;
  } catch (_) {
    return false;
  }
}

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
  const publisherResponse = await client.bze.cointrunk.publisher({address: publisher});
  
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

export const getAllPublishers = async (): Promise<QueryPublishersResponseSDKType|undefined> => {
  let client = await bze.ClientFactory.createLCDClient({restEndpoint: getRestUrl()})

  return new Promise<QueryPublishersResponseSDKType|undefined>((resolve) => {
        resolve(client.bze.cointrunk.publishers({pagination: paginationDefaultParams()}));
  });
}