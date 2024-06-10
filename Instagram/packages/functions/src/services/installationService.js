import { asyncSettings } from '@functions/repositories/settingRepository'
import { getShopByDomain } from '@functions/repositories/shopRepository'

/**
 * @param {object} ctx
 * @return {Promise<void>}
 */
export async function installApp(ctx) {
    try {
        console.log('================installApp================')
        const shopifyDomain = ctx.state.shopify.shop
        const shopData = await getShopByDomain(shopifyDomain)
        if (!shopData.success) {
            throw new Error('Shop not found')
        }

        const asyncSetting = await asyncSettings(shopData.data.id)
        if (asyncSetting.error) {
            throw new Error(asyncSetting.error)
        }

        console.log('================End - installApp================')
    } catch (error) {
        console.log('Error in installApp: ', error.message)
    }
}
