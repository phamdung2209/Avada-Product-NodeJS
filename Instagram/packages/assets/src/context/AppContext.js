import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [isConnectIG, setIsConnectIG] = useState(true)

    const [valueSettings, setValueSettings] = useState({
        title: 'Instagram Feed',
        spacing: 1,
        layout: 'grid',
        numberColumns: 2,
        numberRows: 4,
    })

    return (
        <AppContext.Provider
            value={{
                isConnectIG,
                setIsConnectIG,
                valueSettings,
                setValueSettings,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
