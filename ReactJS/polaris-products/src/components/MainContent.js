import { ResourceItem, ResourceList, Thumbnail } from '@shopify/polaris'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { NoteIcon } from '@shopify/polaris-icons'

import FilterProduct from './FilterProduct'
import BtnDeleteProduct from './BtnDeleteProduct'
import useModal from '~/hooks/useModal'
import ItemProduct from './ItemProduct'
import ModalContainer from './ModalContainer'
import { useAppContext } from '~/context/AppContext'
import useUpdateProduct from '~/hooks/useUpdateProduct'
import { readFileAsDataURL } from '~/ultils/functions'

const MainContent = ({ data, loading, queryValue, setQueryValue, setSortBy, sortBy }) => {
    const [selectedItems, setSelectedItems] = useState([])

    const searchRef = useRef(null)

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

    console.log('render MainContent')
    return (
        <>
            <ResourceList
                resourceName={{ singular: 'product', plural: 'products' }}
                items={data}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                selectable
                loading={loading}
                promotedBulkActions={promotedBulkActions}
                filterControl={<FilterProduct queryValue={queryValue} setQueryValue={setQueryValue} ref={searchRef} />}
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

            <Modals onSubmit={async () => handleSubmit()} title="Edit product information">
                <ModalContainer values={values} setValues={setValues} handleSubmit={handleSubmit} product={product} />
            </Modals>
        </>
    )
}

export default memo(MainContent)
