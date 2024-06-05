import { SETTING } from '@functions/const/const'
import { getIgMe } from '@functions/controllers/IgController'
import { Firestore } from '@google-cloud/firestore'

const firestore = new Firestore()
const usersRef = firestore.collection('users')
const mediasRef = firestore.collection('medias')
const settingsRef = firestore.collection('settings')

export const asyncMedia = async (data, user) => {
    try {
        let media = []

        if (!data.length) {
            return media
        } else {
            const docsMedia = await mediasRef.get()

            if (docsMedia.empty) {
                const dataCanPush = data.map((item) => {
                    item.userId = user.id
                    return item
                })

                dataCanPush.forEach(async (item) => {
                    await mediasRef.add(item)
                    media.push(item)
                })

                return dataCanPush
            } else {
                data.forEach(async (item) => {
                    if (!docsMedia.docs.some((doc) => doc.data().id === item.id)) {
                        item.userId = user.id
                        await mediasRef.add(item)
                        await media.push(item)
                    } else {
                        await media.push(item)
                    }
                })
            }
        }

        return media
    } catch (error) {
        console.log('Error in getMedia: ', error.message)
        return []
    }
}

export const asyncIgMe = async () => {
    try {
        const data = await getIgMe()
        let user = await usersRef.where('id', '==', data.id).get()

        if (user.empty) {
            await usersRef.add(data)
            return data
        }

        return user.docs[0].data()
    } catch (error) {
        console.log('Error in getIgMe: ', error.message)
        return null
    }
}

export const updateIgMe = async ({ user_id, accessTokenHash, permissions, username }) => {
    try {
        const user = await usersRef.where('id', '==', user_id).get()
        if (user.empty) {
            await usersRef.add({
                id: user_id,
                accessTokenHash,
                permissions,
                username,
            })
        } else {
            await usersRef.doc(user.docs[0].id).update({
                accessTokenHash,
                permissions,
                username,
            })
        }

        return {
            success: true,
            message: 'User updated',
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getMe = async ({ user_id }) => {
    try {
        const user = await usersRef.where('id', '==', user_id).get()
        if (user.empty) {
            throw new Error('No user found')
        }

        return {
            success: true,
            data: user.docs[0].data(),
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getUserById = async ({ user_id }) => {
    try {
        const user = await usersRef.where('id', '==', user_id).get()

        if (user.empty) {
            throw new Error('No user found')
        }

        return user.docs[0].data()
    } catch (error) {
        console.log('Error in getUserById: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getSettingByUserId = async (user_id) => {
    try {
        const setting = await settingsRef.where('userId', '==', user_id).get()
        if (setting.empty) {
            throw new Error('No setting found')
        }

        return setting.docs[0].data()
    } catch (error) {
        console.log('Error in getSettingByUserId: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const updateFeedSettings = async (
    { title, layout, spacing, numberRows, numberColumns },
    userId,
) => {
    try {
        const setting = await settingsRef.where('userId', '==', userId).get()
        if (setting.empty) {
            await settingsRef.add({
                title,
                layout,
                spacing,
                numberRows,
                numberColumns,
                userId,
            })
        } else {
            await settingsRef.doc(setting.docs[0].id).update({
                title,
                layout,
                spacing,
                numberRows,
                numberColumns,
            })
        }

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
        const docUsers = await usersRef.get()
        const users = docUsers.docs.map((doc) => doc.data())

        users.forEach(async (user) => {
            const setting = await settingsRef.where('userId', '==', user.id).get()
            if (setting.empty) {
                await settingsRef.add({
                    ...SETTING,
                    userId: user.id,
                    shopId,
                })
            }
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
