import { Modal } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import useDeleteProducts from '~/hooks/useDeleteProducts'

const BtnDeleteProduct = ({ selectedItems, setSelectedItems }) => {
    const [active, setActive] = useState(false)
    const toggleModal = useCallback(() => setActive((active) => !active), [])

    const { deleteProducts } = useDeleteProducts()
    const handleDeleteProduct = async () => {
        try {
            await deleteProducts(selectedItems)

            setSelectedItems([])
        } catch (error) {
            console.log('Error in handleDeleteProduct: ', error)
        }
    }
    return (
        <Modal
            activator={<span onClick={toggleModal}>Delete</span>}
            open={active}
            onClose={toggleModal}
            title="Do you want to delete this product?"
            primaryAction={{
                destructive: true,
                content: 'Yes, delete it',
                onAction: handleDeleteProduct,
            }}
            secondaryActions={[
                {
                    content: 'No, keep it',
                    onAction: toggleModal,
                },
            ]}
        >
            <Modal.Section>This product will be deleted and cannot be recovered.</Modal.Section>
        </Modal>
    )
}

export default BtnDeleteProduct
