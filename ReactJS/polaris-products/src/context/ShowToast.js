import { createContext, useContext, useState } from 'react'

export const ShowToastContext = createContext()

export const useToastContext = () => {
    return useContext(ShowToastContext)
}

export const ShowContextProvider = ({ children }) => {
    const [isShowToast, setIsShowToast] = useState(false)

    return <ShowToastContext.Provider value={{ isShowToast, setIsShowToast }}>{children}</ShowToastContext.Provider>
}
