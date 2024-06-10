import Router from 'koa-router'
import jsonType from '@functions/middleware/jsonType'

import * as shopController from '@functions/controllers/shopController'
import * as subscriptionController from '@functions/controllers/subscriptionController'
import {
    authMe,
    getMedia,
    getSettings,
    logoutUser,
    syncMedia,
    updateSettings,
} from '@functions/controllers/IgController'
import { protectRoute } from '@functions/middleware/protectRoute'

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

    // INSTAGRAM ROUTES
    router.get('/auth', protectRoute, authMe)
    router.post('/logout', logoutUser)

    router.get('/settings', protectRoute, getSettings)
    router.put('/settings', protectRoute, updateSettings)
    router.get('/media', protectRoute, getMedia)
    router.post('/media/sync', protectRoute, syncMedia)

    return router
}

// INSTAGRAM ROUTES
export const IgRoutes = (prefix = '/api') => {
    const router = new Router({
        prefix,
    })

    // router.get('/auth/instagram', handleAuthInstagram)
    // router.get('/auth/instagram/callback', handleAuthInstagramCallback)
    router.get('/auth', authMe)
    router.post('/logout', logoutUser)

    router.get('/settings', protectRoute, getSettings)
    router.put('/settings', protectRoute, updateSettings)
    router.post('/media', protectRoute, getMedia)

    return router
}
