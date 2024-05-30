import Shopify from 'shopify-api-node';
import shopifyConfig from '../config/shopify';
import {prepareShopData} from '@avada/core';
import {findJsonBlockByProp, getMainThemeId} from '@avada/shopify-api-utils';

export const API_VERSION = '2023-04';

/**
 *
 * @param shopData
 * @param apiVersion
 * @returns {Shopify}
 */
export function initShopify(shopData, apiVersion = API_VERSION) {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;
  return new Shopify({
    apiVersion,
    accessToken,
    shopName: shopifyDomain,
    autoLimit: true
  });
}

export async function getAppInfo(shop, themeId = '') {
  try {
    const shopify = initShopify(shop);
    if (!themeId) {
      themeId = await getMainThemeId(shopify);
    }

    const status = await checkAddedAppEmbed({shopify, themeId});
    return {status, themeId};
  } catch (e) {
    console.error('Get app info error', e);
    return false;
  }
}


export async function checkAddedAppEmbed({shopify, themeId}) {
  try {
    const templateJson = await shopify.asset.get(themeId, {
      asset: {key: 'config/settings_data.json'}
    });

    const templateValue = JSON.parse(templateJson.value);
    const embedApp = findJsonBlockByProp(templateValue, 'type', shopifyConfig.embedAppId);
    return !!(embedApp && embedApp.hasOwnProperty('disabled') && !embedApp?.disabled);
  } catch (e) {
    console.error('check if enabled embed app error', e);
    return false;
  }
}
