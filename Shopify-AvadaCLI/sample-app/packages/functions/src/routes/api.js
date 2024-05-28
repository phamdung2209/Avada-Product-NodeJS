import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import jsonType from '@functions/middleware/jsonType';
import {getSettings, updatedSettings} from '../controllers/settingsController';
import {getNotifications} from '../controllers/notificationsController';
import Shopify from 'shopify-api-node';
import {getCurrentUserShopId} from '@avada/core/build/authentication';
import {getShopById} from '../repositories/shopRepository';

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
    router.get('/orders', async ctx => {
        const shopId = getCurrentUserShopId(ctx);
        const shopData = await getShopById(shopId);

        // const shopify = new Shopify({
        //     shopName: shopData.shop,
        //     accessToken: shopData.accessToken,
        //     apiVersion: '2022-07'
        // });

        // const orders = await shopify.order.list();

        ctx.body = {
            shopData,
            shopId,
            // orders
            shop: ctx.state.user.shop.shopifyDomain
        };
    });

    return router;
}
