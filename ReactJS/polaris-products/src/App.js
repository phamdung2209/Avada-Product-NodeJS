import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider, Page, Frame } from '@shopify/polaris'

import Header from './components/Header'
import CreateTodo from './components/CreateTodo'
import { useThemeMode } from './context/ThemeMode'
import ProductItems from './components/ProductItems'

function App() {
    const { themeMode } = useThemeMode()

    return (
        <AppProvider i18n={enTranslations} theme={themeMode}>
            <Frame topBar={<Header />}>
                <Page title="Products" primaryAction={<CreateTodo />}>
                    <ProductItems />
                </Page>
            </Frame>
        </AppProvider>
    )
}

export default App
