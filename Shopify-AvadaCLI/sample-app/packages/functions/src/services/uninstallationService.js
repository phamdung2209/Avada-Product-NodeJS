import * as shopRepository from '../repositories/shopRepository';
import {initShopify} from './shopifyService';
import {deleteMetaField} from '@functions/services/shopify/shopifyMetaFieldService';

/**
 * Remove some information about shop after uninstalling app
 *
 * @param {object} ctx
 * @return {Promise<void>}
 */
export async function uninstallApp(ctx) {
  const domain = ctx.get('X-Shopify-Shop-Domain');
  const shop = await shopRepository.getShopByField(domain);
  const shopify = initShopify(shop);
  console.log('-----------------------------');
  console.log('Handle uninstall');
  console.log('-----------------------------');

  if (shop !== null && shop.accessToken !== null) {
    await Promise.all([
      deleteMetaField(shopify)
    ]);
  }
}
