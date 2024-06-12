import { useAppContext } from '@assets/context/AppContext'
import { useLayoutEffect } from 'react'

const useLogin = (me) => {
    const { setState } = useAppContext()

    useLayoutEffect(() => {
        if (me) {
            setState((prevState) => ({
                ...prevState,
                isConnectIG: true,
            }))
        } else {
            setState((prevState) => ({
                ...prevState,
                isConnectIG: false,
            }))
        }
    }, [me])
}

export default useLogin
