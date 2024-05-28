import {Firestore} from '@google-cloud/firestore';

/**
 * @param {object} ctx
 * @return {Promise<void>}
 */
const firestore = new Firestore();
const settingsRef = firestore.collection('settings');
const shopsRef = firestore.collection('shops');

export async function installApp(ctx) {
    console.log('================installApp================');
    try {
        const shopifyDomain = ctx.state.shopify.shop;

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
        if (shopData.empty) {
            console.log('Shop not found');
            return;
        }

        const shopId = shopData.docs[0].id;

        const settingsData = await settingsRef.where('shopId', '==', shopId).get();
        if (settingsData.empty) {
            await settingsRef.add({...SETTINGS, shopId});

            console.log('Settings added');
        }
    } catch (error) {
        console.log(error);
    }
}
