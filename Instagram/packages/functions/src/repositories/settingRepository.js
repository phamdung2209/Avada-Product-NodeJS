import { SETTING } from '@functions/config/settingDefault'
import { getUsers } from './userRepository'
import { upsertMetaField } from '@functions/services/shopify/shopifyMetaFieldService'

const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore()
const settingsRef = firestore.collection('settings')

export const getSettingByUserId = async (user_id) => {
    try {
        const setting = await settingsRef.doc('' + user_id).get()

        if (setting.empty) {
            throw new Error('No setting found')
        }

        return setting.data()
    } catch (error) {
        console.log('Error in getSettingByUserId: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getSettingByShopId = async (shopId) => {
    try {
        const setting = await settingsRef.where('shopId', '==', shopId).get()
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

export const updateFeedSettings = async (
    { title, layout, spacing, numberRows, numberColumns },
    userId,
    shopId,
) => {
    console.log('-------------------------------------------')
    try {
        const batch = firestore.batch()
        batch.set(settingsRef.doc('' + userId), {
            title,
            layout,
            spacing,
            numberRows,
            numberColumns,
            shopId,
        })
        await batch.commit()

        // UPDATE SHOPIFY META FIELD HERE
        await upsertMetaField({
            shopId,
            namespace: 'instagram',
            key: 'setting',
            value: {
                title,
                layout,
                spacing,
                numberRows,
                numberColumns,
            },
        })

        return {
            success: true,
            message: 'Settings is updated!',
        }
    } catch (error) {
        console.log('Error in updateFeedSettings: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const asyncSettings = async (shopId) => {
    try {
        // alway only one user
        const users = await getUsers()

        await settingsRef.doc('' + users[0].id).set({
            ...SETTING,
            shopId,
        })

        // UPDATE SHOPIFY META FIELD HERE
        await upsertMetaField({
            shopId,
            namespace: 'instagram',
            key: 'setting',
            value: SETTING,
        })

        return {
            success: true,
            message: 'Settings is added!',
        }
    } catch (error) {
        console.log('Error in asyncSettings: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}
