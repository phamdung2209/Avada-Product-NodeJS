import { createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProvider = ({ children }) => {
    const [actionDeleteProduct, setActionDeleteProduct] = useState(0)

    return <AppContext.Provider value={{ actionDeleteProduct, setActionDeleteProduct }}>{children}</AppContext.Provider>
}
