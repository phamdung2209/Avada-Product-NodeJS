import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider, Page, Frame, Button } from '@shopify/polaris'

import Header from './components/Header'
import { useThemeMode } from './context/ThemeMode'
import ProductItems from './components/ProductItems'
import useModal from './hooks/useModal'
import ModalContainer from './components/ModalContainer'
import { useCallback, useState } from 'react'
import { readFileAsDataURL } from './ultils/functions'
import useCreateProducts from './hooks/useCreateProducts'
import { useAppContext } from './context/AppContext'

function App() {
    const { themeMode } = useThemeMode()
    const [values, setValues] = useState({
        name: '',
        price: '',
        description: '',
        images: '',
    })

    const { createProduct } = useCreateProducts()
    const { setActionDeleteProduct } = useAppContext()

    const handleSubmit = useCallback(async () => {
        const urlImage = await readFileAsDataURL(values.images[0])
        await createProduct({ ...values, product: 'pros', images: urlImage })
        setActionDeleteProduct((prev) => prev + 1)
    }, [createProduct, values, setActionDeleteProduct])

    const { Modals, handleOpen } = useModal()

    return (
        <AppProvider i18n={enTranslations} theme={themeMode}>
            <Frame topBar={<Header />}>
                <Button variant="primary">oksss</Button>
                <Page title="Products" primaryAction={{ content: 'Create a new product', onAction: handleOpen }}>
                    <ProductItems />
                    <Modals onSubmit={handleSubmit} title="Add New Products">
                        <ModalContainer handleSubmit={handleSubmit} values={values} setValues={setValues} />
                    </Modals>
                </Page>
            </Frame>
        </AppProvider>
    )
}

export default App
