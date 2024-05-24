import {BlockStack, Box, InlineGrid, RangeSlider, Text, TextField} from '@shopify/polaris';
import React from 'react';

const TimingItem = ({title, description}) => {
    return (
        <BlockStack>
            <Text>{title}</Text>

            <Box>
                <InlineGrid columns={2} alignItems="center" gap={'400'}>
                    <RangeSlider value={10} min={1} max={60} onChange={() => {}} />
                    <TextField
                        style={{
                            maxWidth: '100px'
                        }}
                        prefix="Second(s)"
                        value="10"
                        type="number"
                        onChange={() => {}}
                    />
                </InlineGrid>

                <Text tone="disabled">{description}</Text>
            </Box>
        </BlockStack>
    );
};

export default TimingItem;
