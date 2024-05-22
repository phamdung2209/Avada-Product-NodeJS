import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import jsonType from '@functions/middleware/jsonType';

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

  return router;
}
