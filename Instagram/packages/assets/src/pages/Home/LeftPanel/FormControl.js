import { Button, Form, FormLayout, InlineStack, Select, TextField } from '@shopify/polaris'
import React, { memo, useCallback, useState } from 'react'
import axios from 'axios'

import { useAppContext } from '@assets/context/AppContext'
import useGetSettings from '@assets/hooks/ig/useGetSettings'
import { SETTINGS } from '@assets/helpers/constants'

const FormControl = () => {
    const { data, loading } = useGetSettings()

    const { valueSettings, setValueSettings } = useAppContext()

    // const [values, setValues] = useState(() => {
    //     if (!data) {
    //         return SETTINGS
    //     }

    //     return {
    //         title: data.title,
    //         spacing: data.spacing,
    //         layout: data.layout,
    //         numberRows: data.numberRows,
    //         numberColumns: data.numberColumns,
    //     }
    // })

    const handleSaveFeed = useCallback(async () => {
        try {
            const res = await axios.post('/api/ig/settings', valueSettings)
            if (res.data.error) {
                throw new Error(res.data.error)
            }

            // TOAST MESSAGE SUCCESS HERE
        } catch (error) {
            console.log('Error in handleSaveFeed: ', error.message)
            // TOAST MESSAGE ERROR HERE
        }
    }, [])

    return (
        <Form>
            <FormLayout>
                <TextField
                    label="Feed title"
                    type="text"
                    value={valueSettings.title}
                    onChange={(value) => setValueSettings({ ...valueSettings, title: value })}
                />
                <TextField
                    label="Post spacing"
                    type="number"
                    value={valueSettings.spacing}
                    onChange={(value) => setValueSettings({ ...valueSettings, spacing: value })}
                    min={0}
                />
                <Select
                    label="Post layout"
                    options={[
                        { label: 'Grid', value: 'grid' },
                        { label: 'List', value: 'list' },
                    ]}
                    value={valueSettings.layout}
                    onChange={(value) => setValueSettings({ ...valueSettings, layout: value })}
                />
                <InlineStack align="space-between" blockAlign="end" wrap={false} gap={400}>
                    <TextField
                        label="Number of rows"
                        type="number"
                        value={valueSettings.numberRows}
                        onChange={(value) =>
                            setValueSettings({ ...valueSettings, numberRows: value })
                        }
                        min={1}
                    />
                    <TextField
                        label="Number of columns"
                        type="number"
                        value={valueSettings.numberColumns}
                        onChange={(value) =>
                            setValueSettings({ ...valueSettings, numberColumns: value })
                        }
                        min={1}
                    />
                </InlineStack>

                <Button textAlign="center" variant="primary" fullWidth onClick={handleSaveFeed}>
                    Save feed
                </Button>
            </FormLayout>
        </Form>
    )
}

export default memo(FormControl)
