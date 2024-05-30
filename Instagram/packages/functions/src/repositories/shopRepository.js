import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '../helpers/utils/firestoreUtils';
import presentShop from '../presenters/shopPresenter';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('shops');

/**
 *
 * @param id
 * @param isFormat
 * @returns {Promise<any>}
 */
export async function getShopById(id, isFormat = true) {
  const doc = await collection.doc(id).get();
  return isFormat ? presentDataAndFormatDate(doc, presentShop) : presentDataAndFormatDate(doc);
}

export async function getShopByDomain(domain, isFormat = true) {
  try {
    const doc = await collection.where('shopifyDomain', '==', domain.toString()).get();

    if (doc.docs.length === 0) {
      return {success: true, data: {}};
    }
    const data = isFormat
      ? presentDataAndFormatDate(doc.docs[0], presentShop)
      : presentDataAndFormatDate(doc.docs[0]);

    return {success: true, data};
  } catch (e) {
    return {success: false, error: e};
  }
}

export async function updateShopFields(shopId, updateData) {
  await collection.doc(shopId).update(updateData);
  return {id: shopId, ...updateData};
}

export async function updateShopData(shopId, postData) {
  try {
    await collection.doc(shopId).update(postData);
    return {success: true};
  } catch (e) {
    console.error(e);
    return {success: false, error: e.message};
  }
}

export async function getShopByField(value, field = 'shopifyDomain') {
  const docs = await collection
    .where(field, '==', value)
    .limit(1)
    .get();

  if (docs.docs.length === 0) {
    return null;
  }

  const doc = docs.docs[0];
  return {id: doc.id, ...doc.data()};
}
