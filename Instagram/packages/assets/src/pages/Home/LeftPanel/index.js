import axios from 'axios'
import { Button, Form, InlineStack, LegacyCard, Link, Text } from '@shopify/polaris'
import { LogoInstagramIcon } from '@shopify/polaris-icons'
import React, { memo, useCallback } from 'react'

import Separator from '@assets/components/Separator'
import { useAppContext } from '@assets/context/AppContext'
import useGetMe from '@assets/hooks/ig/useGetMe'
import FormControl from './FormControl'

const LeftPanel = ({ getMedia, loading }) => {
    const { data: me, loading: loadingIgMe } = useGetMe()
    const { isConnectIG, setIsConnectIG } = useAppContext()

    const handleLoginWithFB = useCallback(async () => {
        window.open('https://ig.local.com/ig/me/auth/instagram', '_self')
    }, [isConnectIG])

    const handleChangeAccount = useCallback(() => {
        window.open('https://ig.local.com/ig/me/auth/instagram', '_self')
    }, [])

    const handleDisconnect = useCallback(async () => {
        await axios.post('/ig/me/logout')
        setIsConnectIG(false)
    }, [])

    const handleSync = useCallback(() => {
        getMedia()
    }, [])

    return (
        <>
            <LegacyCard sectioned>
                {isConnectIG && me ? (
                    <InlineStack blockAlign="center">
                        <Text fontWeight="bold">Connected to @{me.username}</Text>
                        <Separator backgroundColor="#999" width="2px" height="15px" />

                        <Link onClick={handleChangeAccount}>Change account</Link>
                        <Separator backgroundColor="#999" width="1.5px" height="15px" />

                        <Link onClick={handleDisconnect}>Disconnect</Link>
                        <Separator backgroundColor="#999" width="1.5px" height="15px" />
                        <Link onClick={handleSync}>{loading ? 'Syncing...' : 'Sync'}</Link>
                    </InlineStack>
                ) : (
                    <Button
                        icon={LogoInstagramIcon}
                        textAlign="center"
                        variant="primary"
                        onClick={handleLoginWithFB}
                        loading={loadingIgMe}
                    >
                        Connect with Instagram
                    </Button>
                )}
            </LegacyCard>

            <LegacyCard sectioned>
                <FormControl />
            </LegacyCard>
        </>
    )
}

export default memo(LeftPanel)
