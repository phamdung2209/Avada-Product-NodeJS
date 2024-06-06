import { Button, Form, FormLayout, InlineStack, Select, TextField } from '@shopify/polaris'
import React, { memo, useCallback } from 'react'
import axios from 'axios'

import { useAppContext } from '@assets/context/AppContext'

const FormControl = () => {
    const { valueSettings, setValueSettings } = useAppContext()

  /**
   * Su dung hook use edit api
   */
    const handleSaveFeed = useCallback(async () => {
        try {
            const res = await axios.post('/ig/me/settings', valueSettings)

            if (res.data.error) {
                throw new Error(res.data.error)
            }

            // TOAST MESSAGE SUCCESS HERE
            alert(res.data.message)
        } catch (error) {
            console.log('Error in handleSaveFeed: ', error.message)
            // TOAST MESSAGE ERROR HERE
            alert(error.message)
        }
    }, [valueSettings])

    return (
        <Form>
            <FormLayout>
                <TextField
                    label="Feed title"
                    type="text"
                    value={valueSettings.title}
                    //TODO: Sua setValueSettings thanh handleSettingChange('title', value)
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
                    //TODO: options nay viet ra file config
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
