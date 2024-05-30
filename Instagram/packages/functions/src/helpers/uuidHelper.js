import {v4 as uuidv4} from 'uuid';
import {updateShopData} from '../repositories/shopRepository';

/**
 * @param shop
 * @returns {Promise<string>}
 */
export async function initCrispSessionToken(shop) {
  const {id: shopId, crispSessionToken} = shop;
  if (crispSessionToken) return crispSessionToken;

  const newToken = 'igFeed-' + uuidv4();
  await updateShopData(shopId, {crispSessionToken: newToken});
  return newToken;
}
