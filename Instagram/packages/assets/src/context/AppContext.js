import { SETTINGS } from '@assets/helpers/constants'
import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [isConnectIG, setIsConnectIG] = useState(false)

    const [valueSettings, setValueSettings] = useState(SETTINGS)

    const [state, setState] = useState({
        isConnectIG: false,
        valueSettings: SETTINGS,
    })

    return (
        <AppContext.Provider
            value={{
                isConnectIG,
                setIsConnectIG,
                valueSettings,
                setValueSettings,
                setState,
                state,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
