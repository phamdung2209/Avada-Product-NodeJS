import { Button, InlineStack, LegacyCard, Link, Text } from '@shopify/polaris'
import { LogoInstagramIcon } from '@shopify/polaris-icons'
import React, { memo, useCallback } from 'react'

import Separator from '@assets/components/Separator'
import { useAppContext } from '@assets/context/AppContext'
import FormControl from './FormControl'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import useCreateApi from '@assets/hooks/api/useCreateApi'
import useLogin from '@assets/hooks/ig/useLogin'

const LeftPanel = ({ getMedia, loading }) => {
    const { isConnectIG, setIsConnectIG } = useAppContext()
    const { data: me, loading: loadingIgMe, fetchApi } = useFetchApi({
        url: '/apiSa/auth',
        defaultData: null,
    })

    useLogin(me)

    const { creating, handleCreate } = useCreateApi({
        url: '/apiSa/logout',
        errorMsg: 'Failed to disconnect',
        successMsg: 'Disconnected successfully',
    })

    const { creating: syncMediaLoading, handleCreate: handleSyncMedia } = useCreateApi({
        url: '/apiSa/media/sync',
        errorMsg: 'Failed to sync media',
        successMsg: 'Media synced successfully',
    })

    const handleLoginWithFB = useCallback(async () => {
        const popup = window.open('/ig/me/auth/instagram', 'mozillaWindow', 'popup')

        if (popup) {
            const timer = setInterval(async () => {
                if (popup.closed) {
                    await fetchApi()
                    clearInterval(timer)
                }
            }, 500)
        }
    }, [isConnectIG])

    const handleChangeAccount = useCallback(() => {
        window.open('/ig/me/auth/instagram', 'mozillaWindow', 'popup')
    }, [])

    const handleDisconnect = useCallback(async () => {
        await handleCreate()
        setIsConnectIG(false)
    }, [])

    const handleSync = async () => {
        await handleSyncMedia()
        await getMedia()
        // await Promise.all([handleSyncMedia(), getMedia()]) => async
    }

    return (
        <>
            <LegacyCard sectioned>
                {isConnectIG && me ? (
                    <InlineStack blockAlign="center">
                        <Text fontWeight="bold">Connected to @{me.username}</Text>
                        <Separator backgroundColor="#999" width="2px" height="15px" />

                        <Link onClick={handleChangeAccount}>Change account</Link>
                        <Separator backgroundColor="#999" width="1.5px" height="15px" />

                        <Link onClick={handleDisconnect}>
                            {creating ? 'Disconnecting...' : 'Disconnect'}
                        </Link>
                        <Separator backgroundColor="#999" width="1.5px" height="15px" />
                        <Link onClick={handleSync}>
                            {loading || syncMediaLoading ? 'Syncing...' : 'Sync'}
                        </Link>
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
