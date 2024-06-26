import { Firestore } from '@google-cloud/firestore'

import { LIMIT_MEDIA_IN_ONE_DOC } from '@functions/const/const'
import { upsertMetaField } from '@functions/services/shopify/shopifyMetaFieldService'

const firestore = new Firestore()
const mediaRef = firestore.collection('medias')

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

export const getMedia = async () => {
    try {
        const media = await mediaRef.get()

        return {
            success: true,
            data:
                media.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) ?? [],
        }
    } catch (error) {
        console.log('Error in getMedia: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const createMedia = async ({ user, shopId, data: { data } }) => {
    try {
        const media = await getMedia()
        if (media.error) {
            throw new Error('Error get all media')
        }

        const { data: mediaData } = media

        const docs = data.reduce((acc, cur, idx) => {
            if (idx % LIMIT_MEDIA_IN_ONE_DOC === 0) {
                acc.push([cur])
            } else {
                acc[acc.length - 1].push(cur)
            }
            return acc
        }, [])

        const batch = firestore.batch()

        docs.forEach((doc, idx) => {
            if (mediaData[idx]) {
                batch.set(
                    mediaRef.doc(mediaData[idx].id),
                    {
                        userId: user.id,
                        shopId,
                        data: doc,
                    },
                    {
                        merge: true,
                    },
                )
            } else {
                batch.set(
                    mediaRef.doc(),
                    {
                        userId: user.id,
                        shopId,
                        data: doc,
                    },
                    {
                        merge: true,
                    },
                )
            }
        })

        // Delete media when data less than media
        mediaData.slice(docs.length).forEach((doc) => {
            batch.delete(mediaRef.doc(doc.id))
        })

        await batch.commit()

        // save data in metafield
        await upsertMetaField({
            shopId,
            namespace: 'instagram',
            key: 'media',
            value: data,
        })

        return {
            success: true,
            message: 'Sync media success',
        }
    } catch (error) {
        console.error('Error in createMedia: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}

export const updateMediaUrlById = async ({ newMediaUrl, idDoc, dataOfIdDoc: { data = [] } }) => {
    try {
        const dataMeida = data.map((doc) => {
            return {
                ...doc,
                media_url: newMediaUrl,
            }
        })

        const media = await mediaRef.doc(idDoc).update({
            data: dataMeida,
        })

        if (!media) {
            throw new Error('Error in update media url')
        }

        return {
            success: true,
            message: 'Update media url success!',
        }
    } catch (error) {
        console.error('Error in updateMediaUrlById: ', error.message)
        return {
            success: false,
            error: error.message,
        }
    }
}
