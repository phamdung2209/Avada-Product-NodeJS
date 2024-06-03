import Router from 'koa-router'
import * as shopController from '@functions/controllers/shopController'
import * as subscriptionController from '@functions/controllers/subscriptionController'
import jsonType from '@functions/middleware/jsonType'

import { getSettings, updatedSettings } from '../controllers/settingsController'
import { getNotifications } from '../controllers/notificationsController'

export default function getRoutes(prefix = '/api') {
    const router = new Router({
        prefix,
    })

    router.get('/shops', shopController.getUserShops)
    router.get('/shop/get/:domain', shopController.getOne)
    router.put('/shop/set', jsonType, shopController.setOne)
    router.get('/shop/embedStatus', shopController.getEmbedStatus)
    router.put('/republish', shopController.republishTheme)
    router.get('/subscription', subscriptionController.getSubscription)
    router.get('/settings', getSettings)
    router.put('/settings', updatedSettings)
    router.get('/notifications', getNotifications)

    return router
}
