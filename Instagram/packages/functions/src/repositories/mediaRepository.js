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
export const createBulk = async (docs, data) => {
    try {
        // docs = [{}, {}, {}]
        const batch = firestore.batch()
        docs.forEach((doc) => {
            batch.set(mediaRef.doc(), {
                ...data,
                data: doc,
            })
        })
        await batch.commit()

        return {
            success: true,
            message: 'Sync media success!',
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

// export const createMedia = async ({ user, shopId, data: { data } }) => {
//     try {
//         const { docs: dataMedia } = await mediaRef.get()
//         const media = dataMedia.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }))

//         const docs = data.reduce((acc, cur, idx) => {
//             if (idx % LIMIT_MEDIA_IN_ONE_DOC === 0) {
//                 acc.push([cur])
//             } else {
//                 acc[acc.length - 1].push(cur)
//             }

//             return acc
//         }, [])

//         if (!media.length) {
//             return await createBulk(docs, {
//                 userId: user.id,
//                 shopId,
//             })
//         }

//         const batch = firestore.batch()

//         if (docs.length === media.length) {
//             docs.forEach((doc, idx) => {
//                 batch.set(mediaRef.doc(media[idx].id), {
//                     userId: user.id,
//                     shopId,
//                     data: doc,
//                 })
//             })
//         } else if (docs.length > media.length) {
//             docs.forEach((doc, idx) => {
//                 if (media[idx]) {
//                     batch.set(mediaRef.doc(media[idx].id), {
//                         userId: user.id,
//                         shopId,
//                         data: doc,
//                     })
//                 } else {
//                     batch.set(mediaRef.doc(), {
//                         userId: user.id,
//                         shopId,
//                         data: doc,
//                     })
//                 }
//             })
//         } else {
//             media.forEach((doc, idx) => {
//                 if (docs[idx]) {
//                     batch.set(mediaRef.doc(doc.id), {
//                         userId: user.id,
//                         shopId,
//                         data: docs[idx],
//                     })
//                 } else {
//                     batch.delete(mediaRef.doc(doc.id))
//                 }
//             })
//         }

//         await batch.commit()

//         return {
//             success: true,
//             message: 'Sync media success',
//         }
//     } catch (error) {
//         console.log('Error in createMedia: ', error.message)
//         return {
//             success: false,
//             error: error.message,
//         }
//     }
// }

export const createMedia = async ({ user, shopId, data: { data } }) => {
    try {
        const { docs: dataMedia } = await mediaRef.get()
        const media = dataMedia.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        const docs = data.reduce((acc, cur, idx) => {
            if (idx % LIMIT_MEDIA_IN_ONE_DOC === 0) {
                acc.push([cur])
            } else {
                acc[acc.length - 1].push(cur)
            }
            return acc
        }, [])

        // if (!media.length) {
        //     await createBulk(docs, {
        //         userId: user.id,
        //         shopId,
        //     })

        //     return {
        //         success: true,
        //         message: 'Sync media success',
        //     }
        // }

        const batch = firestore.batch()

        docs.forEach((doc, idx) => {
            if (media[idx]) {
                batch.set(mediaRef.doc(media[idx].id), {
                    userId: user.id,
                    shopId,
                    data: doc,
                })
            } else {
                batch.set(mediaRef.doc(), {
                    userId: user.id,
                    shopId,
                    data: doc,
                })
            }
        })

        // Delete media when data less than media
        media.slice(docs.length).forEach((doc) => {
            batch.delete(mediaRef.doc(doc.id))
        })

        await batch.commit()

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
