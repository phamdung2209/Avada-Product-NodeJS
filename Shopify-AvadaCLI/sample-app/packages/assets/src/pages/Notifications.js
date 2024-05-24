import {
    BlockStack,
    Box,
    Icon,
    InlineStack,
    LegacyCard,
    Page,
    Pagination,
    ResourceItem,
    ResourceList,
    Text,
    Thumbnail
} from '@shopify/polaris';
import React, {useState} from 'react';
import {CheckSmallIcon} from '@shopify/polaris-icons';
import {extractTime, formatDate} from '../helpers/utils/functions';
import ProductItem from '../components/ProductItem/';

const Notifications = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

    const sortOptions = [
        {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
        {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
        {label: 'A - Z', value: 'ALPHABETICAL_ASC'},
        {label: 'Z - A', value: 'ALPHABETICAL_DESC'}
    ];

    const items = [
        {
            id: 1,
            name: 'Notification 1',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2024-04-25T15:54:54.171+00:00',
            updatedAt: '2024-04-25T15:54:54.171+00:00'
        },
        {
            id: 2,
            name: 'Notification 2',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2024-04-24T15:54:54.171+00:00',
            updatedAt: '2024-04-24T15:54:54.171+00:00'
        },
        {
            id: 3,
            name: 'Notification 3',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2021-02-06T15:54:54.171+00:00',
            updatedAt: '2021-02-06T15:54:54.171+00:00'
        },
        {
            id: 4,
            name: 'Notification 4',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2022-02-06T15:54:54.171+00:00',
            updatedAt: '2022-02-06T15:54:54.171+00:00'
        },
        {
            id: 5,
            name: 'Notification 5',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2023-02-06T15:54:54.171+00:00',
            updatedAt: '2023-02-06T15:54:54.171+00:00'
        },
        {
            id: 6,
            name: 'Notification 6',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2024-02-06T15:54:54.171+00:00',
            updatedAt: '2024-02-06T15:54:54.171+00:00'
        },
        {
            id: 7,
            name: 'Notification 7',
            description: 'This is a notification',
            thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
            publicBy: 'AVADA',
            createdAt: '2024-02-06T15:54:54.171+00:00',
            updatedAt: '2024-02-06T15:54:54.171+00:00'
        }
    ];

    return (
        <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
            <LegacyCard>
                <ResourceList
                    resourceName={{
                        plural: 'notifications',
                        singular: 'notification'
                    }}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    selectable
                    items={items}
                    // bulkActions={[
                    //     {
                    //         content: 'Mark as read',
                    //         onAction: () => console.log('Mark as read')
                    //     }
                    // ]}
                    // promotedBulkActions={[
                    //     {
                    //         content: 's'
                    //     }
                    // ]}
                    sortValue={sortValue}
                    onSortChange={setSortValue}
                    sortOptions={sortOptions}
                    renderItem={renderResourceItem}
                />
            </LegacyCard>

            <Box padding={'1000'}>
                <InlineStack align="center">
                    <Pagination
                        hasPrevious
                        hasNext
                        previousKeys={[{content: 'Previous'}]}
                        nextKeys={[{content: 'Next'}]}
                    />
                </InlineStack>
            </Box>
        </Page>
    );
};

export default Notifications;

const renderResourceItem = items => <ProductItem {...items} />;
