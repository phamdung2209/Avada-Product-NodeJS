import React, {useCallback, useRef, useState} from 'react';
import {
    Avatar,
    BlockStack,
    Button,
    Frame,
    InlineStack,
    Loading,
    Navigation,
    TextContainer,
    Toast,
    TopBar
} from '@shopify/polaris';
import {ArrowLeftIcon, BugIcon, PersonExitIcon, ViewIcon} from '@shopify/polaris-icons';
import isStaging from '@assets/helpers/isStaging';
import BadgeBranch from '@assets/components/BadgeBranch';
import getNavigations from '@assets/config/navigations';
import {useHistory, withRouter} from 'react-router-dom';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast, logout} from '@assets/actions/storeActions';
import PropTypes from 'prop-types';

/**
 *
 * @param children
 * @param location
 * @returns {Element}
 * @constructor
 */
function AppFullLayout({children, location}) {
    const {state, dispatch} = useStore();
    const {shop, loading, toast} = state;

    const history = useHistory();
    const skipToContentRef = useRef(null);
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);

    const toggleMobileNavigationActive = useCallback(
        () => setMobileNavigationActive(!mobileNavigationActive),
        [mobileNavigationActive]
    );

    const toggleUserMenuActive = useCallback(() => setUserMenuActive(!userMenuActive), [
        userMenuActive
    ]);

    const handleLogout = async () => {
        await logout(dispatch);
    };
    const userMenuActions = [
        {
            items: [
                {
                    content: 'Log out',
                    icon: PersonExitIcon,
                    onAction: handleLogout
                }
            ]
        }
    ];

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={userMenuActions}
            name={shop?.firstName}
            detail={shop?.shopifyDomain}
            initials={shop?.name?.charAt(0)?.toUpperCase()}
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={
                // <InlineStack blockAlign="center" gap={300}>
                //     <Avatar
                //         name={shop?.firstName}
                //         initials={shop?.firstName?.charAt(0)?.toUpperCase()}
                //     />
                //     <TextContainer>{shop?.firstName}</TextContainer>
                // </InlineStack>
                userMenuMarkup
            }
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    const navigations = getNavigations(location, history);
    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section items={navigations} />
        </Navigation>
    );

    return (
        <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
            skipToContentTarget={skipToContentRef.current}
            logo={{
                topBarSource:
                    'https://s3-alpha-sig.figma.com/img/66f5/d160/93cd24e048cf62f7be519066a8949e25?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hT7sCAooMHG~nQoybs7~VCQo5zxubSKIGJxtR9L~bG13HyauWlPMGa~BSKbs4sk4MjZXEh85g3tpvTxIaat2l4uBQdZLhaS81K7~uJ4MtqN4gMwPlXyxOObVAqFJckSWvk3T7x7xeQ~5jyfGE2CpWsJxloOKQSurqocTgPu3v3ABYa6WidXNZN8lEuuDpjnmCMBf2~sfhcrWWdJ~MlkWb8eBMQFLIWQT4HP0T8Azq2UzChbAqd5qsTvLaF5iqqNnrw2CcfGmJPdy423ifv~VfJddAepx0Ad9MqtewXgAmfFYUx9wtCyHCV0Njn2bOpIdSLsMg5OMQc9fhsrMV8zqww__',
                width: 86,
                url: '#',
                accessibilityLabel: 'Avada'
            }}
        >
            <div className="Avada__FullLayout">
                {/* {isStaging && <BadgeBranch />} */}
                {children}
                {loading && <Loading />}
                {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
            </div>
        </Frame>
    );
}

AppFullLayout.propTypes = {
    children: PropTypes.object,
    location: PropTypes.object
};
export default withRouter(AppFullLayout);
