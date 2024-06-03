import Shopify from 'shopify-api-node'

import { getShopByDomain } from '@functions/repositories/shopRepository'
import { getAccessTokenShopify } from '@functions/repositories/webHookRepository'
import { asyncOrders } from '@functions/repositories/ordersRepository'
import { asyncSettings } from '@functions/repositories/settingsRepository'

/**
 * @param {object} ctx
 * @return {Promise<void>}
 */

export async function installApp(ctx) {
    console.log('================installApp================')
    try {
        const shopifyDomain = ctx.state.shopify.shop
        const { data: shopData, success } = await getShopByDomain(shopifyDomain)
        const shopId = shopData.id

        const accessToken = await getAccessTokenShopify(ctx, shopifyDomain)

        const shopify = new Shopify({
            shopName: shopifyDomain,
            accessToken,
        })

        if (!success) {
            console.log('Shop not found')
            return
        }

        await Promise.all([asyncOrders(shopify, shopId), asyncSettings(shopId)])

        console.log('================End - installApp================')
    } catch (error) {
        console.log(error)
    }
}

export const getProductImage = (products = [], doc) => {
    const idsOrder = doc.line_items.map((item) => item.product_id)
    const product = products.find((item) => idsOrder.includes(item.id))
    return product?.image?.src
}
