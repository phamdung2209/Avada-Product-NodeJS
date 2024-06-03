import { useAppContext } from '@assets/context/AppContext'
import {
    Button,
    Form,
    FormLayout,
    InlineStack,
    LegacyCard,
    Select,
    TextField,
} from '@shopify/polaris'
import { LogoInstagramIcon } from '@shopify/polaris-icons'
import React, { memo, useCallback } from 'react'

const LeftPanel = () => {
    const { isConnectIG, setIsConnectIG } = useAppContext()

    const handleLoginWithFB = useCallback(async () => {
        setIsConnectIG(!isConnectIG)
    }, [isConnectIG])

    return (
        <>
            <LegacyCard sectioned>
                <Button
                    icon={LogoInstagramIcon}
                    textAlign="center"
                    variant="primary"
                    onClick={handleLoginWithFB}
                >
                    Connect with Instagram
                </Button>
            </LegacyCard>

            <LegacyCard sectioned>
                <Form>
                    <FormLayout>
                        <TextField label="Feed title" type="text" />
                        <TextField label="Post spacing" type="number" />
                        <Select
                            label="Post layout"
                            options={[
                                { label: 'Grid', value: 'grid' },
                                { label: 'List', value: 'list' },
                            ]}
                        />
                        <InlineStack align="space-between" blockAlign="end" wrap={false} gap={400}>
                            <TextField label="Number of rows" type="number" />
                            <TextField label="Number of columns" type="number" />
                        </InlineStack>

                        <Button textAlign="center" variant="primary" fullWidth>
                            Save feed
                        </Button>
                    </FormLayout>
                </Form>
            </LegacyCard>
        </>
    )
}

export default memo(LeftPanel)
