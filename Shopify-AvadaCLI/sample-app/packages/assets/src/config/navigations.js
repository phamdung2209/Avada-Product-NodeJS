import {HomeIcon} from '@shopify/polaris-icons';
import getUrl from '../helpers/getUrl';

const getNavigations = (location, history) => {
  const {pathname} = location;
  const navItems = [
    {
      label: 'Dashboard',
      icon: HomeIcon,
      selected: pathname === getUrl('/') || pathname === getUrl(''),
      url: '/'
    }
  ].filter(Boolean);
  return navItems.map(item => ({...item, onClick: () => history.push(item.url)}));
};

export default getNavigations;
