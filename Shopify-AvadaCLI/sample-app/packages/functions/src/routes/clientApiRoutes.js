import { getDataClient } from '@functions/controllers/notificationsController'
import Router from 'koa-router'

const router = new Router({
    prefix: '/client-api',
})

router.get('/shopify-domain', getDataClient)

export default router
