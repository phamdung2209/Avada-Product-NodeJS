import { Button, LegacyCard, Pagination, ResourceItem, ResourceList, Thumbnail } from '@shopify/polaris'
import { NoteIcon } from '@shopify/polaris-icons'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import useGetProducts from '~/hooks/useGetProducts'
import SkeletonProduct from '~/skeletons/SkeletonProduct'
import BtnDeleteProduct from './BtnDeleteProduct'
import FilterProduct from './FilterProduct'
import useDebounce from '~/hooks/useDebounce'
import ItemProduct from './ItemProduct'
import useModal from '~/hooks/useModal'
import ModalContainer from './ModalContainer'
import { readFileAsDataURL } from '~/ultils/functions'
import { useAppContext } from '~/context/AppContext'
import useUpdateProduct from '~/hooks/useUpdateProduct'

const ProductItems = () => {
    const [sortBy, setSortBy] = useState('desc')
    const [selectedItems, setSelectedItems] = useState([])
    const searchRef = useRef(null)

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 5,
    })

    const [queryValue, setQueryValue] = useState('')
    const searchData = useDebounce(queryValue, 700)
    const { data, loading } = useGetProducts({ sortBy, pagination, q: searchData })

    const { Modals, handleOpen } = useModal()

    const promotedBulkActions = [
        {
            content: <BtnDeleteProduct setSelectedItems={setSelectedItems} selectedItems={selectedItems} />,
        },
    ]

    if (selectedItems.length === 1) {
        promotedBulkActions.unshift({
            content: 'Edit product',
            onAction: () => handleOpen(),
        })
    }

    const handleSortChange = useCallback((selected) => setSortBy(selected), [])

    // USE MODAL HERE
    const [values, setValues] = useState({
        name: '',
        price: '0',
        description: '',
        images: '',
    })
    const { setActionDeleteProduct } = useAppContext()
    const { updateProduct } = useUpdateProduct()
    const product = data.find((item) => item.id === selectedItems[0])
    const handleSubmit = async (e) => {
        const urlImage = await readFileAsDataURL(values.images[0])
        await updateProduct({ ...values, product: 'pros', images: urlImage, id: product.id })
        setActionDeleteProduct((prev) => prev + 1)
    }

    useEffect(() => {
        if (product) {
            setValues({
                name: product.name,
                price: product.price,
                description: product.description,
                images: product.images,
            })
        }
    }, [product])
    console.log('render proItems')
    return (
        <LegacyCard>
            {loading ? (
                <SkeletonProduct />
            ) : (
                <ResourceList
                    resourceName={{ singular: 'product', plural: 'products' }}
                    items={data}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    selectable
                    loading={loading}
                    promotedBulkActions={promotedBulkActions}
                    filterControl={
                        <FilterProduct queryValue={queryValue} setQueryValue={setQueryValue} ref={searchRef} />
                    }
                    sortValue={sortBy}
                    sortOptions={[
                        { label: 'Newest update', value: 'desc' },
                        { label: 'Oldest update', value: 'asc' },
                        { label: 'Name', value: 'name' },
                        { label: 'ID', value: 'id' },
                    ]}
                    onSortChange={handleSortChange}
                    renderItem={({ id, image, name, price, description, createdAt }) => {
                        return (
                            <ResourceItem
                                id={id}
                                media={<Thumbnail source={image ?? NoteIcon} alt="Black choker necklace" />}
                                accessibilityLabel={`View details for ${name}`}
                            >
                                <ItemProduct
                                    id={id}
                                    name={name}
                                    price={price}
                                    description={description}
                                    createdAt={createdAt}
                                />
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

            <Modals onSubmit={async () => handleSubmit()} title="Edit product information">
                <ModalContainer values={values} setValues={setValues} handleSubmit={handleSubmit} product={product} />
            </Modals>
        </LegacyCard>
    )
}

export default memo(ProductItems)
