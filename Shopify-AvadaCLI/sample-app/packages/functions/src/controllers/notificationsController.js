import {getAllNotifications} from '../repositories/notificationsRepository';

export const getNotifications = async ctx => {
    try {
        const notifications = await getAllNotifications();
        if (!notifications) {
            throw new Error('No notifications found');
        }

        ctx.body = notifications;
    } catch (error) {
        console.log('Error in getNotifications (settingsController.js)', error.message);
        ctx.body = {
            error: error.message
        };
    }
};
