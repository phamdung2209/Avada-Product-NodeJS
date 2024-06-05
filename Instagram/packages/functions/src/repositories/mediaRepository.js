const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore()
const mediaRef = firestore.collection('medias')
const settingRef = firestore.collection('settings')

export const getMediaByShopId = async (shopId) => {
    try {
        const media = await mediaRef.where('shopId', '==', shopId).get()
        if (media.empty) {
            return {
                success: false,
                data: null,
                error: 'No media found',
            }
        }

        return {
            success: true,
            data: media.docs.map((doc) => doc.data()),
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getSettingByShopId = async (shopId) => {
    try {
        const setting = await settingRef.where('shopId', '==', shopId).get()
        if (setting.empty) {
            return {
                success: false,
                error: 'No setting found',
            }
        }

        return {
            success: true,
            data: setting.docs[0].data(),
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}
