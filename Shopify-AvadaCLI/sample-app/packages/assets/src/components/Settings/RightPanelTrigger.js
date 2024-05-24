import {Box, LegacyCard, Select, Text, TextField} from '@shopify/polaris';
import React, {useState} from 'react';

const RightPanelTrigger = () => {
    const [selected, setSelected] = useState(0);

    const options = [
        {label: 'All pages', value: 'all-pages'},
        {label: 'Specific pages', value: 'specific-pages'}
    ];
    return (
        <Box>
            <LegacyCard.Section title="PAGES RESTRICTION">
                <Select options={options} value={selected} onChange={setSelected} />
            </LegacyCard.Section>

            {selected === 'specific-pages' && (
                <LegacyCard.Section title="Included pages">
                    <TextField
                        placeholder="https://example.com/page1"
                        multiline={3}
                        value=""
                        onChange={() => {}}
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
                    value=""
                    onChange={() => {}}
                />

                <Text tone="disabled">
                    Page URLs NOT to show the pop-up (Separated by new lines)
                </Text>
            </LegacyCard.Section>
        </Box>
    );
};

export default RightPanelTrigger;
