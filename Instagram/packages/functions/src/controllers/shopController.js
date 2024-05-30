import {getCurrentShop} from '../helpers/auth';
import {getShopInfoByShopId} from '../repositories/shopInfoRepository';
import {
  getShopByDomain,
  getShopById,
  updateShopData,
  updateShopFields
} from '../repositories/shopRepository';
import {getAppInfo} from '../services/shopifyService';
import {updateMetaField} from '../services/shopify/shopifyMetaFieldService';
import {authentication} from '@avada/core';
import {isEmpty, isUndefined} from '@avada/utils';
import {v4 as uuidv4} from 'uuid';

export async function getOne(ctx) {
  const {domain} = ctx.params;
  const shopData = await getShopByDomain(domain);
  ctx.body = {...shopData, message: 'Success'};
}

export async function setOne(ctx) {
  const shopId = getCurrentShop(ctx);
  const {shop} = ctx.req.body;
  ctx.body = await updateShopData(shopId, shop);
}

export async function getUserShops(ctx) {
  try {
    const shop = await authentication.getShop(ctx);
    const shopId = getCurrentShop(ctx);

    const [
      shopInfo,
      shopData
    ] = await Promise.all([
      getShopInfoByShopId(shopId),
      getShopById(shopId)
    ]);

    let crispSessionToken = shopData.crispSessionToken;
    const updateShopData = {};
    if (!crispSessionToken) {
      crispSessionToken = 'mtf-' + uuidv4();
      updateShopData.crispSessionToken = crispSessionToken;
    }

    if (!isEmpty(updateShopData)) {
      await updateShopFields(shopId, updateShopData);
    }

    delete shopData.accessToken;
    delete shopData.accessTokenHash;

    return (ctx.body = {
      success: true,
      data: {
        ...shopData,
        shopifyCountry: shopInfo.country,
        shopifyPlan: shopInfo.planName,
        firstName: shopInfo.shopOwner,
        currency: shopInfo.currency,
        timezone: shopInfo.timezone,
        ianaTimezone: shopInfo.ianaTimezone,
        crispSessionToken
      }
    });
  } catch (e) {
    console.error('Error getting shops', e);
    return (ctx.body = {
      success: false,
      message: e.message
    });
  }
}

export async function republishTheme(ctx) {
  const shopId = getCurrentShop(ctx);
  await updateMetaField(shopId);
  ctx.body = {success: true, message: 'Re-publish successfully'};
}

export async function getEmbedStatus(ctx) {
  try {
    const shop = await authentication.getShop(ctx);
    const {status} = await getAppInfo(shop);
    ctx.body = {embedStatus: status};
  } catch (e) {
    return (ctx.body = {
      success: false,
      message: e.message
    });
  }
}
