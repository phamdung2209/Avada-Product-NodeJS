import { Button, Form, FormLayout, InlineStack, Select, TextField } from '@shopify/polaris'
import React, { memo, useCallback } from 'react'

import { useAppContext } from '@assets/context/AppContext'
import useEditApi from '@assets/hooks/api/useEditApi'
import { SELECT_OPTIONS } from '@assets/config/formControl'

const FormControl = () => {
    const { valueSettings, setValueSettings } = useAppContext()

    const { editing, handleEdit } = useEditApi({
        url: '/settings',
        fullResp: true,
    })

    const handleSaveFeed = useCallback(async () => {
        await handleEdit(valueSettings)
    }, [valueSettings])

    const handleChangeSettings = useCallback(
        (key, value) => {
            setValueSettings({ ...valueSettings, [key]: value })
        },
        [valueSettings],
    )

    return (
        <Form>
            <FormLayout>
                <TextField
                    label="Feed title"
                    type="text"
                    value={valueSettings.title}
                    onChange={(value) => handleChangeSettings('title', value)}
                />
                <TextField
                    label="Post spacing"
                    type="number"
                    value={valueSettings.spacing}
                    onChange={(value) => handleChangeSettings('spacing', value)}
                    min={0}
                />
                <Select
                    label="Post layout"
                    options={SELECT_OPTIONS}
                    value={valueSettings.layout}
                    onChange={(value) => handleChangeSettings('layout', value)}
                />
                <InlineStack align="space-between" blockAlign="end" wrap={false} gap={400}>
                    <TextField
                        label="Number of rows"
                        type="number"
                        value={valueSettings.numberRows}
                        onChange={(value) => handleChangeSettings('numberRows', value)}
                        min={1}
                    />
                    <TextField
                        label="Number of columns"
                        type="number"
                        value={valueSettings.numberColumns}
                        onChange={(value) => handleChangeSettings('numberColumns', value)}
                        min={1}
                    />
                </InlineStack>

                <Button
                    loading={editing}
                    textAlign="center"
                    variant="primary"
                    fullWidth
                    onClick={handleSaveFeed}
                >
                    Save feed
                </Button>
            </FormLayout>
        </Form>
    )
}

export default memo(FormControl)
