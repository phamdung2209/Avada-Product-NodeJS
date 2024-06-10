import { useAppContext } from '@assets/context/AppContext'
import { useLayoutEffect } from 'react'

const useLogin = (me) => {
    const { setIsConnectIG } = useAppContext()

    useLayoutEffect(() => {
        if (me) {
            setIsConnectIG(true)
        } else {
            setIsConnectIG(false)
        }
    }, [me])
}

export default useLogin
