import {BlockStack, Icon, InlineStack, ResourceItem, Text, Thumbnail} from '@shopify/polaris';
import {CheckSmallIcon} from '@shopify/polaris-icons';
import React from 'react';
import {extractTime, formatDate} from '../../helpers/utils/functions';

const ProductItems = ({id, name, description, thumbnailUrl, publicBy, updatedAt, createdAt}) => {
    return (
        <ResourceItem
            id={id}
            name={name}
            description={description}
            media={<Thumbnail source={thumbnailUrl} alt="" />}
            accessibilityLabel={`View details for ${name}`}
        >
            <InlineStack align="space-between" blockAlign="start">
                <BlockStack>
                    <Text>{description}</Text>
                    <Text as="strong" variant="headingSm">
                        {name}
                    </Text>
                    <InlineStack gap={300}>
                        {updatedAt && <Text>{extractTime(updatedAt)}</Text>}
                        <InlineStack>
                            <Icon source={CheckSmallIcon} tone="base" />
                            by <Text>{publicBy}</Text>
                        </InlineStack>
                    </InlineStack>
                </BlockStack>
                <Text tone="base">From: {formatDate(createdAt)}</Text>
            </InlineStack>
        </ResourceItem>
    );
};

export default ProductItems;
