import {Box, LegacyCard, Select, Text, TextField} from '@shopify/polaris';
import React, {memo} from 'react';

const RightPanelTrigger = ({settings, setSettings}) => {
    const {allowShow = 'all', includedUrls, excludedUrls} = settings;

    const OPTIONS = [
        {label: 'All pages', value: 'all'},
        {label: 'Specific pages', value: 'specific'}
    ];

    return (
        <Box>
            <LegacyCard.Section title="PAGES RESTRICTION">
                <Select
                    options={OPTIONS}
                    value={allowShow}
                    onChange={e => setSettings({...settings, allowShow: e})}
                />
            </LegacyCard.Section>

            {allowShow === 'specific' && (
                <LegacyCard.Section title="Included pages">
                    <TextField
                        placeholder="https://example.com/page1"
                        multiline={3}
                        value={includedUrls}
                        onChange={e => setSettings({...settings, includedUrls: e})}
                    />

                    <Text tone="disabled">
                        Page URLs to show the pop-up (Separated by new lines)
                    </Text>
                </LegacyCard.Section>
            )}

            <LegacyCard.Section title="Excluded pages">
                <TextField
                    placeholder="https://example.com/page1"
                    multiline={3}
                    value={excludedUrls}
                    onChange={e => setSettings({...settings, excludedUrls: e})}
                />

                <Text tone="disabled">
                    Page URLs NOT to show the pop-up (Separated by new lines)
                </Text>
            </LegacyCard.Section>
        </Box>
    );
};

export default memo(RightPanelTrigger);
