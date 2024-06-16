import React from 'react'
import ReactDOM from 'react-dom/client'
import './app.scss'

import App from './App'
import { AppContextProvider } from '~/assets/src/context/AppContext'

ReactDOM.createRoot(document.querySelector('.ig-component')).render(
    // <React.StrictMode>
    <AppContextProvider>
        <App />
    </AppContextProvider>,
    // </React.StrictMode>,
)
