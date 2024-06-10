import { Tabs } from '@shopify/polaris'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import RightPanelDisplay from './RightPanelDisplay'
import RightPanelTrigger from './RightPanelTrigger'
import { fetchAuthenticatedApi } from '../../helpers'
import { SETTINGS } from '@assets/config/settings'

const RightPanel = (props, ref) => {
    const [settings, setSettings] = useState(SETTINGS)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const res = await fetchAuthenticatedApi('/settings')

            if (res.error) {
                // or if (!res.success)
                console.error('Error getting settings', res.error)
                return
            }
            setSettings(res.data)
        }

        getData()
    }, [])

    useImperativeHandle(
        ref,
        () => ({
            settings,
        }),
        [settings],
    )

    return (
        <Tabs
            tabs={[
                { id: 0, content: 'Display' },
                { id: 1, content: 'Trigger' },
            ]}
            selected={activeTab}
            onSelect={setActiveTab}
        >
            {activeTab === 0 && (
                <>
                    {/* Display */}
                    <RightPanelDisplay settings={settings} setSettings={setSettings} />
                </>
            )}

            {activeTab === 1 && (
                <>
                    {/* Trigger */}
                    <RightPanelTrigger settings={settings} setSettings={setSettings} />
                </>
            )}
        </Tabs>
    )
}

export default memo(forwardRef(RightPanel))
