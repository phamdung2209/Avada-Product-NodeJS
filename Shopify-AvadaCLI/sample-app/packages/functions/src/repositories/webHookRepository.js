import { prepareShopData } from '@avada/core'

import shopifyConfig from '../config/shopify'
import { getShopByDomain } from './shopRepository'
import { getProductImage } from '@functions/controllers/webhookController'
import Shopify from 'shopify-api-node'

const { default: Firestore } = require('@google-cloud/firestore/build/src')

const firestore = new Firestore()
const notificationsRef = firestore.collection('notifications')

export const getAccessTokenShopify = async (ctx, shopifyDomain) => {
    try {
        const { data } = await getShopByDomain(shopifyDomain)
        const { accessToken } = prepareShopData(ctx, data, shopifyConfig.accessTokenKey)

        return accessToken
    } catch (error) {
        console.log('Error in getAccessTokenShopify: ', error.message)
        return null
    }
}

export const asyncNotification = async (data, newOrderId, shopifyDomain, ctx) => {
    try {
        const { data: shopData } = await getShopByDomain(shopifyDomain)

        const accessToken = await getAccessTokenShopify(ctx, shopifyDomain)

        if (!accessToken) return

        const shopify = new Shopify({
            shopName: shopifyDomain,
            accessToken,
        })
        const docsProducts = await shopify.product.list()

        const notifyData = await notificationsRef.where('id', '==', newOrderId).get()

        if (notifyData.empty) {
            await notificationsRef.add({
                id: data.id ?? 'abc',
                city: data.billing_address?.city ?? 'Ha Noi',
                country: data.billing_address?.country ?? 'Viet Nam',
                firstName: data.billing_address?.first_name ?? 'Customer',
                productId: data.line_items[0].id ?? 9999,
                productName: data.line_items[0].title ?? 'Sport T-shirt',
                productImage: getProductImage(docsProducts, data),
                timestamp: data.created_at ?? '2021-09-01T00:00:00Z',
                shopId: shopData.id,
            })
        }
    } catch (error) {
        console.log('Error in asyncNotification: ', error.message)
    }
}
