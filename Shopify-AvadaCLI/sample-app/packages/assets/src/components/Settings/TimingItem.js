import {BlockStack, Box, InlineGrid, RangeSlider, Text, TextField} from '@shopify/polaris';
import React from 'react';

const TimingItem = ({title, description, value, setSettings, keyValue}) => {
    return (
        <BlockStack className="timing-item">
            <Text>{title}</Text>

            <Box>
                <InlineGrid columns={2} alignItems="center" gap={'400'}>
                    <RangeSlider
                        value={value}
                        min={0}
                        max={10}
                        onChange={value => {
                            setSettings(prev => ({...prev, [keyValue]: value}));
                        }}
                    />
                    <TextField
                        style={{
                            maxWidth: '100px'
                        }}
                        // prefix="Second(s)"
                        value={value}
                        max={10}
                        min={0}
                        type="number"
                        onChange={value => {
                            setSettings(prev => ({...prev, [keyValue]: value}));
                        }}
                    />
                </InlineGrid>

                <Text tone="disabled">{description}</Text>
            </Box>
        </BlockStack>
    );
};

export default TimingItem;
