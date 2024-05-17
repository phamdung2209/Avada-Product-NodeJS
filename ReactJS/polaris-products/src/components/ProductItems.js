import { Box, LegacyCard, Pagination, ResourceItem, ResourceList, Text, Thumbnail } from '@shopify/polaris'
import { NoteIcon } from '@shopify/polaris-icons'
import React, { useState } from 'react'

import useGetProducts from '~/hooks/useGetProducts'
import SkeletonProduct from '~/skeletons/SkeletonProduct'
import BtnDeleteProduct from './BtnDeleteProduct'
import UpdateProduct from './UpdateProduct'
import FilterProduct from './FilterProduct'
import useDebounce from '~/hooks/useDebounce'

const ProductItems = () => {
    const [sortBy, setSortBy] = useState('desc')
    const [selectedItems, setSelectedItems] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 5,
    })
    const { data, loading } = useGetProducts(sortBy, pagination)
    const [queryValue, setQueryValue] = useState('')

    const promotedBulkActions = [
        {
            content: <BtnDeleteProduct setSelectedItems={setSelectedItems} selectedItems={selectedItems} />,
        },
    ]

    if (selectedItems.length === 1) {
        promotedBulkActions.unshift({
            content: <UpdateProduct selectedItems={selectedItems} products={data} />,
        })
    }

    const searchValue = useDebounce(queryValue, 700)

    return (
        <LegacyCard>
            {loading ? (
                <SkeletonProduct />
            ) : (
                <ResourceList
                    resourceName={{ singular: 'product', plural: 'products' }}
                    items={searchValue ? dataSearch : data}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    selectable
                    loading={loading}
                    promotedBulkActions={promotedBulkActions}
                    filterControl={
                        <FilterProduct
                            setDataSearch={setDataSearch}
                            queryValue={queryValue}
                            setQueryValue={setQueryValue}
                        />
                    }
                    sortValue={sortBy}
                    sortOptions={[
                        { label: 'Newest update', value: 'desc' },
                        { label: 'Oldest update', value: 'asc' },
                        { label: 'Name', value: 'name' },
                        { label: 'ID', value: 'id' },
                    ]}
                    onSortChange={(selected) => setSortBy(selected)}
                    renderItem={(item) => {
                        const { id, image, name, price, description, createdAt } = item

                        return (
                            <ResourceItem
                                id={id}
                                media={<Thumbnail source={image ?? NoteIcon} alt="Black choker necklace" />}
                                accessibilityLabel={`View details for ${name}`}
                            >
                                <Box padding="4">
                                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                                        {name} - {id}
                                    </Text>
                                    <Text variant="bodySm">${price}</Text>
                                    <Text variant="bodySm">{description}</Text>

                                    <Text variant="bodySm" muted>
                                        {createdAt}
                                    </Text>
                                </Box>
                            </ResourceItem>
                        )
                    }}
                />
            )}

            <Pagination
                onPrevious={() => {
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }}
                onNext={() => {
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }}
                type="table"
                hasNext
                label="1-50 of 8,450 orders"
            />
        </LegacyCard>
    )
}

export default ProductItems
