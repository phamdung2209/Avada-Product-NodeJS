import {HomeFilledIcon, NotificationFilledIcon, SettingsFilledIcon} from '@shopify/polaris-icons';
import getUrl from '../helpers/getUrl';

const getNavigations = (location, history) => {
    const {pathname} = location;
    const navItems = [
        {
            label: 'Home',
            icon: HomeFilledIcon,
            selected: pathname === getUrl('/') || pathname === getUrl(''),
            url: '/'
        },
        {
            label: 'Notifications',
            icon: NotificationFilledIcon,
            selected: pathname === getUrl('/notifications'),
            url: '/notifications'
        },
        {
            label: 'Settings',
            icon: SettingsFilledIcon,
            selected: pathname === getUrl('/settings'),
            url: '/settings'
        }
    ].filter(Boolean);
    return navItems.map(item => ({...item, onClick: () => history.push(item.url)}));
};

export default getNavigations;
