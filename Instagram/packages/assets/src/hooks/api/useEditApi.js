import { useState } from 'react'
import { api, fetchAuthenticatedApi } from '@assets/helpers'
import { useStore } from '@assets/reducers/storeReducer'
import { setToast } from '@assets/actions/storeActions'
import { handleError } from '@assets/services/errorService'

/**
 * @param url
 * @param defaultState
 * @param fullResp
 * @param useToast
 * @param successMsg
 * @param errorMsg
 * @returns {{editing: boolean, handleEdit}}
 */
export default function useEditApi({
    url,
    defaultState = false,
    fullResp = false,
    useToast = true,
    successMsg = 'Saved successfully',
    errorMsg = 'Failed to save',
}) {
    const { dispatch } = useStore()
    const [editing, setEditing] = useState(defaultState)

    /**
     * @param data
     * @param newEditing
     * @returns {Promise<boolean>}
     */
    const handleEdit = async (data, newEditing = true) => {
        try {
            setEditing((prev) =>
                typeof newEditing === 'boolean' ? newEditing : { ...prev, [newEditing]: true },
            )

            // const resp = await api({
            //     url,
            //     data,
            //     method: 'PUT',
            //     clientConfig: {
            //         baseURL: '/apiSa',
            //         timeout: 0,
            //     },
            // })

            const resp = await fetchAuthenticatedApi(url, {
                method: 'PUT',
                body: data,
            })

            if (resp.success && useToast) {
                setToast(dispatch, resp.message || successMsg)
            }
            if (resp.error) {
                setToast(dispatch, resp.error, true)
            }
            return fullResp ? resp : resp.success
        } catch (e) {
            handleError(e)
            setToast(dispatch, errorMsg, true)
            return fullResp ? { success: false, error: e.message } : false
        } finally {
            setEditing((prev) =>
                typeof newEditing === 'boolean' ? !newEditing : { ...prev, [newEditing]: false },
            )
        }
    }

    return { editing, handleEdit }
}
