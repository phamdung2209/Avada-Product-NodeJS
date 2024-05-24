import {Tabs} from '@shopify/polaris';
import React, {memo, useState} from 'react';
import RightPanelDisplay from './RightPanelDisplay';
import RightPanelTrigger from './RightPanelTrigger';

const RightPanel = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs
            tabs={[
                {id: 0, content: 'Display'},
                {id: 1, content: 'Trigger'}
            ]}
            selected={activeTab}
            onSelect={setActiveTab}
        >
            {activeTab === 0 && (
                <>
                    {/* Display */}
                    <RightPanelDisplay />
                </>
            )}

            {activeTab === 1 && (
                <>
                    {/* Trigger */}
                    <RightPanelTrigger />
                </>
            )}
        </Tabs>
    );
};

export default memo(RightPanel);
