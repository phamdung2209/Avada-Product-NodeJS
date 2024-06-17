import React, { createContext, useContext, useState } from 'react'

import { SETTINGS } from '@assets/helpers/constants'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [state, setState] = useState({
        isConnectIG: false,
        valueSettings: SETTINGS,
    })

    return (
        <AppContext.Provider
            value={{
                setState,
                state,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
