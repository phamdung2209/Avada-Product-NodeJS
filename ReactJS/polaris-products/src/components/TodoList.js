import { Box, Checkbox, Divider, Thumbnail } from '@shopify/polaris'
import React from 'react'

import Status from './Status'
import Button from './Button'

const TodoList = ({ lastIdx, product }) => {
    return (
        <>
            <Box className="flex items-center justify-between">
                <Box>
                    <Checkbox />
                    <Thumbnail
                        source={
                            product?.image ??
                            'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
                        }
                        alt="Buy milk"
                        size="large"
                    />
                </Box>
                <Box className="flex items-center gap-4">
                    <Status Done />
                    <Button title={'Complete'} outline={true} small={true} />
                    <Button title={'Delete'} small={true} deleted />
                </Box>
            </Box>

            {!lastIdx && <Divider />}
        </>
    )
}

export default TodoList
