import {BlockStack, Box, Checkbox, Grid, InlineGrid, LegacyCard, Text} from '@shopify/polaris';
import React, {useState} from 'react';
import DesktopPosition from './DesktopPosition';
import TimingItem from './TimingItem';

const RightPanelDisplay = () => {
    const [desktopPosition, setDesktopPosition] = useState(4);

    const OPTIONS_DISPLAY = [
        {
            id: 0,
            label: 'Hide time ago'
        },
        {
            id: 1,
            label: 'Truncate content text',
            helpText:
                "If your product name is long for one line, it will be truncated to 'Product na...'"
        }
    ];

    const TIMING_ITEMS = [
        {
            id: 0,
            title: 'Display duration',
            description: 'How long each pop will display on your page.'
        },
        {
            id: 1,
            title: 'Time before the first pop',
            description: 'The delay time before the first notification.'
        },
        {
            id: 2,
            title: 'Gap time between two pops',
            description: 'The time interval between tow popup notifications.'
        },
        {
            id: 3,
            title: 'Maximum of popups',
            description:
                'The maximum number of popups are allowed to show after page loading. Maxium number is 80.'
        }
    ];

    return (
        <>
            <LegacyCard.Section title="APPEARANCE">
                <BlockStack gap={'400'}>
                    <Box>
                        <Text>Desktop Position</Text>
                        <InlineGrid gap="400" columns={4}>
                            <DesktopPosition
                                desktopPosition={desktopPosition}
                                setDesktopPosition={setDesktopPosition}
                                idxPosition={4}
                            />
                            <DesktopPosition
                                desktopPosition={desktopPosition}
                                setDesktopPosition={setDesktopPosition}
                                idxPosition={3}
                            />
                            <DesktopPosition
                                desktopPosition={desktopPosition}
                                setDesktopPosition={setDesktopPosition}
                            />
                            <DesktopPosition
                                desktopPosition={desktopPosition}
                                setDesktopPosition={setDesktopPosition}
                                idxPosition={2}
                            />
                        </InlineGrid>
                        <Text tone="disabled">The display position of the pop on your website</Text>
                    </Box>

                    <Box>
                        {OPTIONS_DISPLAY.map(option => (
                            <Checkbox
                                label={option.label}
                                key={option.id}
                                helpText={option.helpText}
                            />
                        ))}
                    </Box>
                </BlockStack>
            </LegacyCard.Section>
            <LegacyCard.Section title="TIMING">
                <Grid
                    columns={{
                        lg: 2,
                        xl: 2,
                        md: 2,
                        sm: 1,
                        xs: 1
                    }}
                >
                    {TIMING_ITEMS.map((item, idx) => (
                        <TimingItem title={item.title} description={item.description} key={idx} />
                    ))}
                </Grid>
            </LegacyCard.Section>
        </>
    );
};

export default RightPanelDisplay;
