import { Box, Modal } from '@shopify/polaris'
import React, { memo, useCallback, useState } from 'react'
import Button from './Button'

import { readFileAsDataURL } from '~/ultils/functions'
import useCreateProducts from '~/hooks/useCreateProducts'
import { useAppContext } from '~/context/AppContext'
import ModalContainer from './ModalContainer'

const CreateTodo = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [values, setValues] = useState({
        name: '',
        price: '',
        description: '',
        images: '',
    })
    const { createProduct } = useCreateProducts()
    const { setActionDeleteProduct } = useAppContext()

    const handleClose = useCallback(() => setIsOpenModal(!isOpenModal), [isOpenModal])
    const activator = <Button title="Create a new product" large={true} add={true} onClick={handleClose} />

    const handleSubmit = useCallback(async () => {
        const urlImage = await readFileAsDataURL(values.images[0])
        await createProduct({ ...values, product: 'pros', images: urlImage })
        setActionDeleteProduct((prev) => prev + 1)
    }, [createProduct, values, setActionDeleteProduct])

    return (
        <Modal
            className="!bg-gray-700"
            onClose={handleClose}
            open={isOpenModal}
            activator={activator}
            title={<Box className="text-[#303030]">Add new product</Box>}
            primaryAction={{
                content: 'Create',
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
            <ModalContainer values={values} setValues={setValues} handleSubmit={handleSubmit} />
        </Modal>
    )
}

export default memo(CreateTodo)
