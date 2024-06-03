import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import './app.css'

import App from './App'

const root = document.createElement('div')
document.body.appendChild(root)

const app = ReactDOM.createRoot(root)
app.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>,
)
