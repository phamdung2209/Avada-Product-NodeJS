import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import './app.scss'

import App from './App'
import { AppContextProvider } from '~/assets/src/context/AppContext'

ReactDOM.createRoot(document.querySelector('.collection')).render(
    <React.StrictMode>
        <AppProvider>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </AppProvider>
    </React.StrictMode>,
)
