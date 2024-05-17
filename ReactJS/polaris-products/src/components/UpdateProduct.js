import { Box, Modal } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '~/context/AppContext'

import useUpdateProduct from '~/hooks/useUpdateProduct'
import { readFileAsDataURL } from '~/ultils/functions'
import ModalContainer from './ModalContainer'

const UpdateProduct = ({ selectedItems, products }) => {
    const product = products.find((item) => item.id === selectedItems[0])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [values, setValues] = useState({
        name: '',
        price: '0',
        description: '',
        images: '',
    })
    const { setActionDeleteProduct } = useAppContext()
    const { loading, updateProduct } = useUpdateProduct()

    const handleClose = useCallback(() => setIsOpenModal(!isOpenModal), [isOpenModal])

    const handleSubmit = async (e) => {
        const urlImage = await readFileAsDataURL(values.images[0])
        await updateProduct({ ...values, product: 'pros', images: urlImage, id: product.id })
        // await createProduct({ ...values, product: 'pros', images: urlImage })
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
    return (
        <Modal
            className="!bg-gray-700"
            onClose={handleClose}
            open={isOpenModal}
            activator={<span onClick={handleClose}>Edit product</span>}
            title={<Box className="text-[#303030]">Update information of the product</Box>}
            primaryAction={{
                content: 'Update',
                onAction: handleSubmit,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    loading: false,
                    onAction: handleClose,
                },
            ]}
        >
            <ModalContainer values={values} setValues={setValues} handleSubmit={handleSubmit} product={product} />
        </Modal>
    )
}

export default UpdateProduct
