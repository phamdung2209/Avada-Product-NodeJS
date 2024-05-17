import React from 'react'
import ReactDOM from 'react-dom/client'
import '@shopify/polaris/build/esm/styles.css'

import './App.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ShowContextProvider } from './context/ShowToast'
import { ThemeModeProvider } from './context/ThemeMode'
import { AppProvider } from './context/AppContext'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <AppProvider>
            <ThemeModeProvider>
                <ShowContextProvider>
                    <App />
                    <Toaster position="top-center" reverseOrder={false} />
                </ShowContextProvider>
            </ThemeModeProvider>
        </AppProvider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
