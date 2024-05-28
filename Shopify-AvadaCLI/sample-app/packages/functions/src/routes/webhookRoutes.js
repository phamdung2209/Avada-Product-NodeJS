import {getNotifications} from '@functions/controllers/webhookController';
import Router from 'koa-router';

const router = new Router({
    prefix: '/webHook'
});

router.post('/order/new', getNotifications);

export default router;
