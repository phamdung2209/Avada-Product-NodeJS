import {BlockStack, Box, Checkbox, Grid, InlineGrid, LegacyCard, Text} from '@shopify/polaris';
import React, {memo, useState} from 'react';
import DesktopPosition from './DesktopPosition';
import TimingItem from './TimingItem';

const RightPanelDisplay = ({settings, setSettings}) => {
    const {
        position = 4,
        displayDuration = 1,
        firstDelay = 1,
        popsInterval = 1,
        maxPopsDisplay = 1
    } = settings;

    const OPTIONS_DISPLAY = [
        {
            id: 0,
            label: 'Hide time ago',
            key: 'hideTimeAgo'
        },
        {
            id: 1,
            label: 'Truncate content text',
            helpText:
                "If your product name is long for one line, it will be truncated to 'Product na...'",
            key: 'truncateProductName'
        }
    ];

    const TIMING_ITEMS = [
        {
            id: 0,
            title: 'Display duration',
            description: 'How long each pop will display on your page.',
            keyValue: 'displayDuration',
            value: displayDuration
        },
        {
            id: 1,
            title: 'Time before the first pop',
            description: 'The delay time before the first notification.',
            keyValue: 'firstDelay',
            value: firstDelay
        },
        {
            id: 2,
            title: 'Gap time between two pops',
            description: 'The time interval between tow popup notifications.',
            keyValue: 'popsInterval',
            value: popsInterval
        },
        {
            id: 3,
            title: 'Maximum of popups',
            description:
                'The maximum number of popups are allowed to show after page loading. Maxium number is 80.',
            keyValue: 'maxPopsDisplay',
            value: maxPopsDisplay
        }
    ];

    const OPTIONS_POSITION = [
        {
            id: 0,
            idxPosition: 4
        },
        {
            id: 1,
            idxPosition: 3
        },
        {
            id: 2,
            idxPosition: 1
        },
        {
            id: 3,
            idxPosition: 2
        }
    ];

    return (
        <>
            <LegacyCard.Section title="APPEARANCE">
                <BlockStack gap={'400'}>
                    <>
                        <Text>Desktop Position</Text>
                        <InlineGrid gap="400" columns={4}>
                            {OPTIONS_POSITION.map(option => (
                                <DesktopPosition
                                    desktopPosition={position ?? 4}
                                    setDesktopPosition={id =>
                                        setSettings(prev => ({...prev, position: id}))
                                    }
                                    idxPosition={option.idxPosition}
                                    key={option.id}
                                />
                            ))}
                        </InlineGrid>
                        <Text tone="disabled">The display position of the pop on your website</Text>
                    </>

                    {OPTIONS_DISPLAY.map(option => (
                        <Checkbox
                            label={option.label}
                            key={option.id}
                            helpText={option.helpText}
                            checked={settings[option.key]}
                            onChange={checked =>
                                setSettings(prev => ({...prev, [option.key]: checked}))
                            }
                        />
                    ))}
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
                        <TimingItem
                            title={item.title}
                            description={item.description}
                            key={idx}
                            keyValue={item.keyValue}
                            value={item.value}
                            setSettings={setSettings}
                        />
                    ))}
                </Grid>
            </LegacyCard.Section>
        </>
    );
};

export default memo(RightPanelDisplay);
