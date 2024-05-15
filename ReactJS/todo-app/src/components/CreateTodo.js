import { Box, Modal, TextContainer } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import Button from './Button'

const CreateTodo = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleClose = useCallback(() => setIsOpenModal(!isOpenModal), [isOpenModal])
    const activator = <Button title="Create Todo" large={true} add={true} onClick={handleClose} />

    return (
        <Box>
            <Modal
                className="!bg-gray-700"
                onClose={handleClose}
                open={isOpenModal}
                activator={activator}
                title={<Box className="text-[#303030]">Create a new todo</Box>}
                primaryAction={{
                    // content: <Button title="Create" large={true} add={true} />,
                    content: 'Create',
                }}
                secondaryActions={[
                    {
                        // content: <Button title="Cancel" large={true} outline={true} />,
                        content: 'Cancel',
                        loading: false,
                        onAction: handleClose,
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        {/* <TextField placeholder="This is my todo name" /> */}
                        <input
                            type="text"
                            placeholder="This is my todo name"
                            className="mb-4 w-full p-2 rounded-lg bg-transparent border border-[#999] focus:outline-none caret-[#008060]"
                        />
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </Box>
    )
}

export default CreateTodo
