import {prepareShopData} from '@avada/core';
import Firestore from '@google-cloud/firestore/build/src';
import Shopify from 'shopify-api-node';
import shopifyConfig from '../config/shopify';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');
const shopsRef = firestore.collection('shops');

export const getNotifications = async ctx => {
    try {
        const data = ctx.req.body;

        const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');

        const shopData = await shopsRef.where('shopifyDomain', '==', shopifyDomain).get();
        if (shopData.empty) {
            console.log('Shop not found');
            // HANDLE SHOP NULL

            return;
        }

        const {accessToken} = prepareShopData(
            ctx,
            shopData.docs[0].data(),
            shopifyConfig.accessTokenKey
        );

        const shopify = new Shopify({
            shopName: shopifyDomain,
            // accessToken: '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'
            accessToken
        });

        const shopId = shopData.docs[0].id;
        const docsProducts = await shopify.product.list();
        const newOrderId = data.id; // get new order id
        const docsOrders = await shopify.order.list();

        const isExistOrder = await handleExistOrder(docsOrders, newOrderId);

        if (isExistOrder) {
            const notifyData = await notificationsRef.where('id', '==', newOrderId).get();

            if (notifyData.empty) {
                await notificationsRef.add({
                    id: data.id ?? 'abc',
                    city: data.billing_address?.city ?? 'Ha Noi',
                    country: data.billing_address?.country ?? 'Viet Nam',
                    firstName: data.billing_address?.first_name ?? 'Customer',
                    productId: data.line_items[0].id ?? 9999,
                    productName: data.line_items[0].title ?? 'Sport T-shirt',
                    productImage: getProductImage(docsProducts, data),
                    timestamp: data.created_at ?? '2021-09-01T00:00:00Z',
                    shopId
                });
            }
        }
    } catch (error) {
        console.log('Error in getNotifications: ', error);
    }
};

const getProductImage = (docsProducts, doc) => {
    const product = docsProducts.find(product => product.id === doc.line_items[0].product_id);
    return product?.image?.src;
};

const handleExistOrder = async (docsOrders, newOrderId) => {
    return docsOrders.some(doc => doc.id === newOrderId);
};
