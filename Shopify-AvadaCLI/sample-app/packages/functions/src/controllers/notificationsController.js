import { getShopByDomain } from '@functions/repositories/shopRepository'
import {
    getAllNotifications,
    getNotificationsByShopId,
} from '../repositories/notificationsRepository'
import { getSettingsByShopId } from '@functions/repositories/settingsRepository'

export const getNotifications = async (ctx) => {
    try {
        const notifications = await getAllNotifications()
        if (!notifications) {
            throw new Error('No notifications found')
        }

        ctx.body = notifications
    } catch (error) {
        console.log('Error in getNotifications (settingsController.js)', error.message)
        ctx.body = {
            error: error.message,
        }
    }
}

export const getDataClient = async (ctx) => {
    try {
        const { shopifyDomain } = ctx.request.query
        if (!shopifyDomain) {
            throw new Error('Shopify domain is required')
        }

        const shopData = await getShopByDomain(shopifyDomain)
        const shopId = shopData.data.id

        const notifications = await getNotificationsByShopId(shopId)
        if (!notifications) {
            throw new Error('No notifications found')
        }

        const setting = await getSettingsByShopId(shopId)
        if (!setting) {
            throw new Error('No settings found')
        }

        ctx.body = {
            data: {
                notifications,
                setting,
            },
        }
    } catch (error) {
        console.log('Error in getNotifyByShopifyDomain (settingsController.js)', error.message)
        ctx.body = {
            error: error.message,
        }
    }
}
