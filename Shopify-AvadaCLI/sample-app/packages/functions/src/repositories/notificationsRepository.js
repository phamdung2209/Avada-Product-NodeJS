import {Firestore} from '@google-cloud/firestore';

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
            ...doc.data()
        }));
    } catch (error) {}
};
