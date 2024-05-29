import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import jsonType from '@functions/middleware/jsonType';
import Shopify from 'shopify-api-node';

import {getSettings, updatedSettings} from '../controllers/settingsController';
import {getNotifications} from '../controllers/notificationsController';
import {getCurrentUserShopId} from '@avada/core/build/authentication';
import {getShopByDomain, getShopById} from '../repositories/shopRepository';
import {getShopByShopifyDomain, prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';

export default function getRoutes(prefix = '/api') {
    const router = new Router({
        prefix
    });

    router.get('/shops', shopController.getUserShops);
    router.get('/shop/get/:domain', shopController.getOne);
    router.put('/shop/set', jsonType, shopController.setOne);
    router.get('/shop/embedStatus', shopController.getEmbedStatus);
    router.put('/republish', shopController.republishTheme);
    router.get('/subscription', subscriptionController.getSubscription);
    router.get('/settings', getSettings);
    router.put('/settings', updatedSettings);
    router.get('/notifications', getNotifications);

    return router;
}
