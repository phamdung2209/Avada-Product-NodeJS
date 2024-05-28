import {BlockStack, Icon, InlineStack, ResourceItem, Text, Thumbnail} from '@shopify/polaris';
import {CheckSmallIcon} from '@shopify/polaris-icons';
import React, {memo} from 'react';
import {extractTime, formatDate} from '../../helpers/utils/functions';

const ProductItem = ({id, country, productImage, timestamp, productName}) => {
    return (
        <ResourceItem
            id={id}
            // name={name}
            // description={description}
            media={<Thumbnail source={productImage} alt="" />}
            accessibilityLabel={`View details for`}
        >
            <InlineStack align="space-between" blockAlign="start">
                <BlockStack>
                    <Text>Someone in {country}</Text>
                    <Text as="strong" variant="headingSm">
                        Purchased {productName}
                    </Text>
                    <InlineStack gap={300}>
                        {timestamp && <Text>{extractTime(timestamp)}</Text>}
                        <InlineStack>
                            <Icon source={CheckSmallIcon} tone="base" />
                            by AVADA
                        </InlineStack>
                    </InlineStack>
                </BlockStack>
                <Text tone="base">From: {formatDate(timestamp)}</Text>
            </InlineStack>
        </ResourceItem>
    );
};

export default memo(ProductItem);
