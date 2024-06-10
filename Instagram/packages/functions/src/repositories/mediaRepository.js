import { LIMIT_MEDIA_IN_ONE_DOC } from '@functions/const/const'
import { presentDataAndFormatDate } from '@functions/helpers/utils/firestoreUtils'
import * as request from '@functions/helpers/utils/httpRequest'
import { deleteAll } from '.'

const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore()
const mediaRef = firestore.collection('medias')
const settingRef = firestore.collection('settings')

export const createOne = async (ref, data) => {
    try {
        const doc = await ref.add(data)
        if (!doc) {
            throw new Error('Error in createOne')
        }

        return {
            success: true,
            message: 'Document created',
        }
    } catch (error) {
        console.log('Error in createOne: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Batch create
export const createBulk = async (medias) => {
    try {
        // medias = [{}, {}, {}]

        medias.forEach((media) => {
            batch.set(mediaRef.doc(), media)
        })

        await batch.commit()

        return {
            success: true,
            message: 'Media created',
        }
    } catch (error) {
        console.log('Error in createBulk: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const getMediaByShopId = async (shopId) => {
    try {
        const media = await mediaRef.where('shopId', '==', shopId).get()

        return {
            success: true,
            data: media.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            }),
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export const createMedia = async ({ user, shopId, data: { data } }) => {
    try {
        const docs = data.reduce((acc, cur, idx) => {
            if (idx % LIMIT_MEDIA_IN_ONE_DOC === 0) {
                acc.push([cur])
            } else {
                acc[acc.length - 1].push(cur)
            }

            return acc
        }, [])

        const batch = firestore.batch()
        // delete media
        const docMedia = await mediaRef.get()
        if (!docMedia.empty) {
            docMedia.docs.forEach((doc) => batch.delete(doc.ref))
        }

        // add new media
        docs.forEach((doc) => {
            batch.set(mediaRef.doc(), {
                userId: user.id,
                shopId,
                data: doc,
            })
        })

        // Commit batch
        await batch.commit()

        return {
            success: true,
            message: 'Sync media success',
        }
    } catch (error) {
        console.log('Error in createMedia: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}
