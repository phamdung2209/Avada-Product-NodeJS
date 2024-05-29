import {Firestore} from '@google-cloud/firestore';
import moment from 'moment';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');

export const getAllNotifications = async () => {
    try {
        const docs = await notificationsRef.get();
        if (docs.empty) {
            return null;
        }

        return docs.docs.map(doc => ({
            id: doc.id,
            timeAgo: moment(doc.data().timestamp).fromNow(),
            ...doc.data()
        }));
    } catch (error) {
        console.log('Error in getAllNotifications (notificationsRepository.js)', error.message);
        return null;
    }
};

export const getNotificationsByShopId = async shopId => {
    try {
        const docs = await notificationsRef.where('shopId', '==', shopId).get();
        if (docs.empty) {
            return null;
        }

        return docs.docs.map(doc => ({
            id: doc.id,
            timeAgo: moment(doc.data().timestamp).fromNow(),
            ...doc.data()
        }));
    } catch (error) {
        console.log(
            'Error in getNotificationsByShopId (notificationsRepository.js)',
            error.message
        );
        return null;
    }
};
