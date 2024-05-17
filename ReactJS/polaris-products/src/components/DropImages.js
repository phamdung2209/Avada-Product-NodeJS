import { DropZone, LegacyCard, LegacyStack, Text, Thumbnail } from '@shopify/polaris'
import { NoteIcon } from '@shopify/polaris-icons'
import React, { memo, useCallback, useEffect, useState } from 'react'

const DropImages = ({ setImages, image }) => {
    const [files, setFiles] = useState([])
    const [openFileDialog, setOpenFileDialog] = useState(false)

    const handleDropZoneDrop = useCallback(
        (dropFiles, _acceptedFiles, _rejectedFiles) => setFiles((files) => [...dropFiles]),
        [],
    )

    useEffect(() => {
        setImages(files)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files])

    const toggleOpenFileDialog = useCallback(() => setOpenFileDialog((openFileDialog) => !openFileDialog), [])

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

    const uploadedFiles = (files.length > 0 || image) && (
        <LegacyStack vertical>
            {files.map((file, index) => (
                <LegacyStack alignment="center" key={index}>
                    <Thumbnail
                        size="small"
                        alt={file.name}
                        source={validImageTypes.indexOf(file.type) > -1 ? window.URL.createObjectURL(file) : NoteIcon}
                    />

                    <div>
                        {file.name}{' '}
                        <Text variant="bodySm" as="p">
                            {file.size} bytes
                        </Text>
                    </div>
                </LegacyStack>
            ))}

            <Thumbnail size="small" alt={''} source={image} />
        </LegacyStack>
    )

    return (
        <LegacyCard
            sectioned
            title="Product Images"
            actions={[
                {
                    content: 'Upload Image',
                    onAction: toggleOpenFileDialog,
                },
            ]}
        >
            <DropZone
                openFileDialog={openFileDialog}
                onDrop={handleDropZoneDrop}
                onFileDialogClose={toggleOpenFileDialog}
            >
                {uploadedFiles}
            </DropZone>
        </LegacyCard>
    )
}

export default memo(DropImages)
