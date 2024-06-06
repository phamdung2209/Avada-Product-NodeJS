import { getMediaByShopId, getSettingByShopId } from '@functions/repositories/mediaRepository'
import { getShopByDomain } from '@functions/repositories/shopRepository'

export const getDataClient = async (ctx) => {
    try {
        const { shopifyDomain } = ctx.request.query

        if (!shopifyDomain) {
          /**
           * ctx.body = {
           *             success: false,
           *             error: <message>,
           *           }
           */
            throw new Error('Shopify domain is required')
        }

        const shopData = await getShopByDomain(shopifyDomain)
        if (!shopData.success) {
            throw new Error('No shop found')
        }

        const shopId = shopData.data.id

        const setting = await getSettingByShopId(shopId)
        if (setting.error) {
            throw new Error(setting.error)
        }

        const media = await getMediaByShopId(shopId)
        if (media.error) {
            throw new Error(media.error)
        }

        ctx.body = {
            success: true,
            data: {
                media: media.data,
                setting: setting.data,
            },
        }
    } catch (error) {
        console.log('Error in getMedia', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}
