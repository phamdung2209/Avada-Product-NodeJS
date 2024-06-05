import { asyncNotification } from '@functions/repositories/webHookRepository'
import { getShopByDomain } from '@functions/repositories/shopRepository'

export const getNotifications = async (ctx) => {
    try {
        const data = ctx.req.body
        const newOrderId = data.id

        const shopifyDomain = ctx.get('X-Shopify-Shop-Domain')

        const { success } = await getShopByDomain(shopifyDomain)
        if (!success) return

        await asyncNotification(data, newOrderId, shopifyDomain, ctx)
    } catch (error) {
        console.log('Error in getNotifications: ', error)
    }
}

export const getProductImage = (docsProducts, doc) => {
    const product = docsProducts.find((product) => product.id === doc.line_items[0].product_id)
    return product?.image?.src
}
