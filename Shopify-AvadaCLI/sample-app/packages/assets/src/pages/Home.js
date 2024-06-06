import { Layout, Text, Page, LegacyCard, InlineStack, Button } from '@shopify/polaris'
import React from 'react'

const Home = () => {
  /**
   * Status nay dung de check check xem media co dc hien thi o storefront hay khong
   */
    return (
        <Page title="Home" fullWidth>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <InlineStack align="space-between" blockAlign="center">
                            <InlineStack gap={100}>
                                App status is <Text fontWeight="medium">disabled</Text>
                            </InlineStack>

                            <Button
                                primary
                                onClick={() => {
                                    console.log('Enable button clicked')
                                }}
                            >
                                Enable
                            </Button>
                        </InlineStack>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

Home.displayName = 'Home'

export default Home
