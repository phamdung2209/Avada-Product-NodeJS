import { Box, Modal } from '@shopify/polaris'
import { useCallback, useState } from 'react'

const useModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const handleClose = useCallback(() => setIsOpenModal(!isOpenModal), [isOpenModal])
    const handleOpen = useCallback(() => setIsOpenModal(true), [])

    const Modals = useCallback(
        ({ children, onSubmit, title }) => (
            <Modal
                onClose={() => setIsOpenModal(false)}
                open={isOpenModal}
                title={<Box className="text-[#303030]">{title}</Box>}
                primaryAction={{
                    content: title ?? 'Create',
                    onAction: async () => await onSubmit(),
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        loading: false,
                        onAction: handleClose,
                    },
                ]}
            >
                {children}
            </Modal>
        ),
        [isOpenModal],
    )

    return {
        isOpenModal,
        setIsOpenModal,
        Modals,
        handleOpen,
        handleClose,
    }
}

export default useModal
