import React, { useCallback } from 'react'
import ToastMessage from './components/ToastMessage'
import useGetSettings from './components/hooks/useGetSettings'

const App = () => {
    const { loading, data } = useGetSettings()
    console.log('data', data)

    const notifyNewest = useCallback(
        data?.notifications?.reduce((acc, curr) => {
            if (!acc) {
                return curr
            }

            if (new Date(acc.timestamp) < new Date(curr.timestamp)) {
                return curr
            }

            return acc
        }, null),
        [data?.notifications],
    )

    return (
        <div
            style={{
                backgroundColor: 'lightgray',
            }}
        >
            {!loading && data && notifyNewest && (
                <ToastMessage notifications={notifyNewest} setting={data.setting} />
            )}
        </div>
    )
}

App.displayName = 'App'

export default App
