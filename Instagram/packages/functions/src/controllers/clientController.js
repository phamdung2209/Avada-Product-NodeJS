import { getMediaByShopId } from '@functions/repositories/mediaRepository'
import { getSettingByShopId } from '@functions/repositories/settingRepository'
import { getShopByDomain } from '@functions/repositories/shopRepository'
import { getUserById } from '@functions/repositories/userRepository'

export const getDataClient = async (ctx) => {
    try {
        const { shopifyDomain } = ctx.request.query

        if (!shopifyDomain) {
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
        const user_id = media.data[0].userId
        const user = await getUserById({ user_id })
        if (user.error) {
            throw new Error(user.error)
        }

        ctx.body = {
            success: true,
            data: {
                media: media.data.map((m) => m.data).flat(),
                user: {
                    username: user?.username,
                },
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
