import { getCurrentUser } from '../helpers/auth'
import { getSettingsByShopId, updateSettingsByShopId } from '../repositories/settingsRepository'

export const getSettings = async (ctx) => {
    try {
        const { shopID } = getCurrentUser(ctx)
        const settings = await getSettingsByShopId(shopID)

        ctx.body = {
            success: true,
            data: settings,
        }
    } catch (error) {
        console.error('Error getting settings', error)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const updatedSettings = async (ctx) => {
    try {
        const { shopID } = getCurrentUser(ctx)
        const body = ctx.req.body

        const settings = await updateSettingsByShopId(shopID, body)

        if (settings instanceof Error) {
            throw new Error('Error updating settings')
        }

        ctx.body = {
            success: true,
            data: settings,
        }
    } catch (error) {
        console.error('Error updating settings', error)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}
