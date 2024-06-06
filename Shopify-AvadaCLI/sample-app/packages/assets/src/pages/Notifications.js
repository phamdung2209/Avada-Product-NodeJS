import {
    Box,
    InlineStack,
    LegacyCard,
    Page,
    Pagination,
    ResourceList,
    SkeletonBodyText,
    SkeletonDisplayText,
    TextContainer
} from '@shopify/polaris';
import React, {memo, useState} from 'react';

import ProductItem from '../components/ProductItem/';
import useGetNotifications from '../hooks/notifications/useGetNotifications';

const Notifications = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  /**
   * TODO: useFetchApi
   */
  const {data, loading} = useGetNotifications();

  //TODO: Cac config luu vao config/notificationConfig, cac page khac tuong tu
    const SORTOPTIONS = [
        {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
        {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
        {label: 'A - Z', value: 'ALPHABETICAL_ASC'},
        {label: 'Z - A', value: 'ALPHABETICAL_DESC'}
    ];

    return (
        <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
            <LegacyCard>
                {loading ? (
                    <ResourceListSkeleton />
                ) : (
                    <ResourceList
                        resourceName={{
                            plural: 'notifications',
                            singular: 'notification'
                        }}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        selectable
                        items={data}
                        bulkActions={[
                            {
                                content: 'Mark as read',
                                onAction: () => console.log('Mark as read')
                            }
                        ]}
                        promotedBulkActions={[
                            {
                                content: 's'
                            }
                        ]}
                        sortValue={sortValue}
                        onSortChange={setSortValue}
                        sortOptions={SORTOPTIONS}
                        renderItem={renderResourceItem}
                    />
                )}
            </LegacyCard>

           //TODO: su dung ResourceList pagination
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

Notifications.displayName = 'Notifications';

export default memo(Notifications);

const renderResourceItem = items => <ProductItem {...items} />;

const ResourceListSkeleton = () => (
    <LegacyCard sectioned>
        <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
        </TextContainer>
    </LegacyCard>
);
