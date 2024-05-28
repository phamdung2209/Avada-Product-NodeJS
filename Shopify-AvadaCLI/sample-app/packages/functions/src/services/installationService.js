import {Firestore} from '@google-cloud/firestore';
import Shopify from 'shopify-api-node';

/**
 * @param {object} ctx
 * @return {Promise<void>}
 */
const firestore = new Firestore();
const settingsRef = firestore.collection('settings');
const shopsRef = firestore.collection('shops');
const notificationsRef = firestore.collection('notifications');

export async function installApp(ctx) {
    console.log('================installApp================');
    try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shopify = new Shopify({
            shopName: shopifyDomain,
            accessToken: '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'
        });

        const SETTINGS = {
            allowShow: 'all',
            displayDuration: 1,
            excludedUrls: 'https://example.com',
            firstDelay: 1,
            hideTimeAgo: false,
            id: '',
            includedUrls: 'https://example.com',
            maxPopsDisplay: 1,
            popsInterval: 1,
            position: 1,
            shopId: '1',
            truncateProductName: false
        };

        const shopData = await shopsRef.where('domain', '==', shopifyDomain).get();
        const shopId = shopData.docs[0].id;

        if (shopData.empty) {
            console.log('Shop not found');
            return;
        }

        // async data orders tp notifications
        await asyncOrders(shopify, shopId);

        const settingsData = await settingsRef.where('shopId', '==', shopId).get();
        if (settingsData.empty) {
            await settingsRef.add({...SETTINGS, shopId});

            console.log('Settings added');
        }

        console.log('================End - installApp================');
    } catch (error) {
        console.log(error);
    }
}

const asyncOrders = async (shopify, shopId) => {
    const docsOrders = await shopify.order.list();
    const docsProducts = await shopify.product.list();

    docsOrders.forEach(async doc => {
        const notifyData = await notificationsRef.where('id', '==', doc.id).get();
        const productImage = getProductImage(docsProducts, doc);

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
                shopId
            });
        } else {
            notifyData.docs.forEach(async item => {
                await notificationsRef.doc(item.id).update({
                    city: doc.billing_address?.city ?? 'Ha Noi',
                    country: doc.billing_address?.country ?? 'Viet Nam',
                    firstName: doc.billing_address?.first_name ?? 'Customer',
                    productId: doc.line_items[0].id ?? 9999,
                    productName: doc.line_items[0].title ?? 'Sport T-shirt',
                    productImage,
                    timestamp: doc.created_at ?? '2021-09-01T00:00:00Z',
                    shopId
                });
            });
        }
    });
};

const getProductImage = (products = [], doc) => {
    const idsOrder = doc.line_items.map(item => item.product_id);
    const product = products.find(item => idsOrder.includes(item.id));
    return product?.image?.src;
};
