import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [isConnectIG, setIsConnectIG] = useState(false)

    return (
        <AppContext.Provider value={{ isConnectIG, setIsConnectIG }}>
            {children}
        </AppContext.Provider>
    )
}
