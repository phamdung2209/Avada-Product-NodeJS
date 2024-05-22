import {Timestamp} from '@google-cloud/firestore/build/src';

declare interface IUserContext {
  shop: Shop;
  shopID: string;
  type: 'shopify';
}

declare interface Shop {
  id: string;
  accessToken: string;
  appStatus: boolean;
  domain: string;
  email: string;
  installedAt: Date | Timestamp | string;
  isInstalled: boolean;
  isOnTrial: boolean;
  name: string;
  plan: string;
  shopifyDomain: string;
  uid: string;
  vendor: string;
}

declare interface ShopInfo {
  [key: string]: any;
}

declare interface Subscription {
  shop: Shop;
  getting: boolean;
  subscribing: boolean;
}

declare interface IStoreReducer {
  state: IStoreState;
  dispatch: Function;
}

declare interface IStoreState {
  loading: boolean;
  user: any;
  shop: Shop;
  subscription: Subscription;
  toast?: {content: string; error: boolean};
}
