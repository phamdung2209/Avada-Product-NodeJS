import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '../../lib/helpers/utils/firestoreUtils';

const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

export const getSettingsByShopId = async shopId => {
    const docs = await settingsRef.where('shopId', '==', shopId).get();

    if (docs.empty) {
        return null;
    }

    const [doc] = docs.docs;
    return presentDataAndFormatDate(doc);
};

export const updateSettingsByShopId = async (shopId, data) => {
    const settings = await getSettingsByShopId(shopId);

    if (!settings) {
        return settingsRef.add(data);
    }

    return settingsRef.doc(settings.id).update(data);
};
