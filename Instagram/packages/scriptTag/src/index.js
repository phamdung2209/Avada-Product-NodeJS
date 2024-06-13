import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import '@shopify/polaris/build/esm/styles.css'
import './app.scss'

import App from './App'
import { AppContextProvider } from '~/assets/src/context/AppContext'

ReactDOM.createRoot(document.querySelector('.ig-component')).render(
    // <React.StrictMode>
    <AppContextProvider>
        <Suspense fallback={<div className="loading">Loading...</div>}>
            <App />
            {/* okkkkkkkkkkkkkk */}
        </Suspense>
    </AppContextProvider>,
    // </React.StrictMode>,
)
