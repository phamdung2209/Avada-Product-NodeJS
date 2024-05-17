import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider, Page, Box, Text, LegacyCard } from '@shopify/polaris'
import Header from './components/Header'
import Button from './components/Button'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'

function App() {
    return (
        <AppProvider i18n={enTranslations} theme="dark-experimental">
            <Header />
            <Page>
                <Box className="flex items-center justify-between mb-8">
                    <Text variant="headingLg" fontWeight="regular">
                        Products
                    </Text>
                    {/* <Button title="Create Todo" large={true} add={true} /> */}
                    <CreateTodo />
                </Box>

                <Box className="mx-3 flex items-center justify-between mb-4">
                    <Text variant="bodyLg">Showing 2 product</Text>

                    <Button title="Select" outline={true} medium={true} checkBox />
                </Box>
                <LegacyCard sectioned>
                    <Box className="flex flex-col gap-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <TodoList key={idx} lastIdx={Array.from({ length: 5 }).length - 1 === idx} />
                        ))}
                    </Box>
                </LegacyCard>
            </Page>
        </AppProvider>
    )
}

export default App
