import { Toast } from '@shopify/polaris'
import React from 'react'
import { useToastContext } from '~/context/ShowToast'

const ToastMessage = () => {
    const { isShowToast, setIsShowToast } = useToastContext()

    return isShowToast ? <Toast content="An error occurred!" onDismiss={() => setIsShowToast(!isShowToast)} /> : null
}

export default ToastMessage
