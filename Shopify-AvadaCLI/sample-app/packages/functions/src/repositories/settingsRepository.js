import { Firestore } from '@google-cloud/firestore'
import { presentDataAndFormatDate } from '../../lib/helpers/utils/firestoreUtils'
import { SETTINGS } from '@functions/const/const'

const firestore = new Firestore()
const settingsRef = firestore.collection('settings')

export const getSettingsByShopId = async (shopId) => {
    const docs = await settingsRef.where('shopId', '==', shopId).get()

    if (docs.empty) {
        return null
    }

    const [doc] = docs.docs

    return {
        id: doc.id,
        ...doc.data(),
    }
}

export const updateSettingsByShopId = async (shopId, data) => {
    const settings = await getSettingsByShopId(shopId)

    if (!settings) {
        return settingsRef.add(data)
    }

    return settingsRef.doc(settings.id).update({
        ...data,
        id: settings.id,
    })
}

export const asyncSettings = async (shopId) => {
    try {
        const settingsData = await settingsRef.where('shopId', '==', shopId).get()
        if (settingsData.empty) {
            await settingsRef.add({ ...SETTINGS, shopId })

            console.log('Settings added')
        }
    } catch (error) {
        console.log('Error asyncSettings: ', error)
    }
}
