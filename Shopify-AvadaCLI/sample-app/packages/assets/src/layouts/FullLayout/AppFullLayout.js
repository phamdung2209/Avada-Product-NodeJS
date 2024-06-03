import React, { useCallback, useRef, useState } from 'react'
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
    TopBar,
} from '@shopify/polaris'
import { ArrowLeftIcon, BugIcon, PersonExitIcon, ViewIcon } from '@shopify/polaris-icons'
import isStaging from '@assets/helpers/isStaging'
import BadgeBranch from '@assets/components/BadgeBranch'
import getNavigations from '@assets/config/navigations'
import { useHistory, withRouter } from 'react-router-dom'
import { useStore } from '@assets/reducers/storeReducer'
import { closeToast, logout } from '@assets/actions/storeActions'
import PropTypes from 'prop-types'

/**
 *
 * @param children
 * @param location
 * @returns {Element}
 * @constructor
 */
function AppFullLayout({ children, location }) {
    const { state, dispatch } = useStore()
    const { shop, loading, toast } = state

    const history = useHistory()
    const skipToContentRef = useRef(null)
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
    const [userMenuActive, setUserMenuActive] = useState(false)

    const toggleMobileNavigationActive = useCallback(
        () => setMobileNavigationActive(!mobileNavigationActive),
        [mobileNavigationActive],
    )

    const toggleUserMenuActive = useCallback(() => setUserMenuActive(!userMenuActive), [
        userMenuActive,
    ])

    const handleLogout = async () => {
        await logout(dispatch)
    }
    const userMenuActions = [
        {
            items: [
                {
                    content: 'Log out',
                    icon: PersonExitIcon,
                    onAction: handleLogout,
                },
            ],
        },
    ]

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={userMenuActions}
            name={shop?.firstName}
            detail={shop?.shopifyDomain}
            initials={shop?.name?.charAt(0)?.toUpperCase()}
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    )

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
    )

    const navigations = getNavigations(location, history)
    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section items={navigations} />
        </Navigation>
    )

    return (
        <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
            skipToContentTarget={skipToContentRef.current}
            logo={{
                topBarSource: 'https://mageplaza-training-docs.web.app/img/logo.png',
                width: 50,
                url: '/',
                accessibilityLabel: 'Avada',
            }}
        >
            <div className="Avada__FullLayout">
                {/* {isStaging && <BadgeBranch />} */}
                {children}
                {loading && <Loading />}
                {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
            </div>
        </Frame>
    )
}

AppFullLayout.propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
}
export default withRouter(AppFullLayout)
