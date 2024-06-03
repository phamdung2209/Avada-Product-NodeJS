import { getProductImage } from '@functions/services/installationService'
import Firestore from '@google-cloud/firestore/build/src'

const firestore = new Firestore()
const notificationsRef = firestore.collection('notifications')

export const asyncOrders = async (shopify, shopId) => {
    const docsOrders = await shopify.order.list()
    const docsProducts = await shopify.product.list()

    docsOrders.forEach(async (doc) => {
        const notifyData = await notificationsRef.where('id', '==', doc.id).get()
        const productImage = getProductImage(docsProducts, doc)

        if (notifyData.empty) {
            await notificationsRef.add({
                id: doc.id ?? 'abc',
                city: doc.billing_address?.city ?? 'Ha Noi',
                country: doc.billing_address?.country ?? 'Viet Nam',
                firstName: doc.billing_address?.first_name ?? 'Customer',
                productId: doc.line_items[0].id ?? 9999,
                productName: doc.line_items[0].title ?? 'Sport T-shirt',
                productImage,
                timestamp: doc.created_at ?? '2021-09-01T00:00:00Z',
                shopId,
            })
        } else {
            notifyData.docs.forEach(async (item) => {
                await notificationsRef.doc(item.id).update({
                    city: doc.billing_address?.city ?? 'Ha Noi',
                    country: doc.billing_address?.country ?? 'Viet Nam',
                    firstName: doc.billing_address?.first_name ?? 'Customer',
                    productId: doc.line_items[0].id ?? 9999,
                    productName: doc.line_items[0].title ?? 'Sport T-shirt',
                    productImage,
                    timestamp: doc.created_at ?? '2021-09-01T00:00:00Z',
                    shopId,
                })
            })
        }
    })
}
