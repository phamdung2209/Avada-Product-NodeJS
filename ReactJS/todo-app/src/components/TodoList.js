import { Box, Checkbox, Divider } from '@shopify/polaris'
import React from 'react'
import Status from './Status'
import Button from './Button'

const TodoList = ({ lastIdx }) => {
    return (
        <>
            <Box className="flex items-center justify-between">
                <Checkbox label="Buy milk" />
                <Box className="flex items-center gap-4">
                    <Status pending />
                    <Button title={'Complete'} outline={true} small={true} />
                    <Button title={'Delete'} small={true} deleted />
                </Box>
            </Box>

            {!lastIdx && <Divider />}
        </>
    )
}

export default TodoList
