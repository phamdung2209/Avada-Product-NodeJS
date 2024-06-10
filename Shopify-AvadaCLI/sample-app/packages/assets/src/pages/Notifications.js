import {
    LegacyCard,
    Page,
    ResourceList,
    SkeletonBodyText,
    SkeletonDisplayText,
    TextContainer,
} from '@shopify/polaris'
import React, { memo, useState } from 'react'

import ProductItem from '../components/ProductItem/'
import { RESOURCENAME, SORTOPTIONS } from '@assets/config/notify'
import useFetchApi from '@assets/hooks/api/useFetchApi'

const Notifications = () => {
    const [selectedItems, setSelectedItems] = useState([])
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC')

    const { data, loading } = useFetchApi({
        url: '/apiSa/notifications',
    })

    return (
        <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
            <LegacyCard>
                {loading ? (
                    <ResourceListSkeleton />
                ) : (
                    <ResourceList
                        resourceName={RESOURCENAME}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        selectable
                        items={data}
                        bulkActions={[
                            {
                                content: 'Mark as read',
                                onAction: () => console.log('Mark as read'),
                            },
                        ]}
                        promotedBulkActions={[
                            {
                                content: 's',
                            },
                        ]}
                        sortValue={sortValue}
                        onSortChange={setSortValue}
                        sortOptions={SORTOPTIONS}
                        renderItem={renderResourceItem}
                        pagination={{
                            hasNext: true,
                            hasPrevious: true,
                            onNext: () => {},
                            onPrevious: () => {},
                        }}
                    />
                )}
            </LegacyCard>
        </Page>
    )
}

Notifications.displayName = 'Notifications'

export default memo(Notifications)

const renderResourceItem = (items) => <ProductItem {...items} />

const ResourceListSkeleton = () => (
    <LegacyCard sectioned>
        <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
        </TextContainer>
    </LegacyCard>
)
