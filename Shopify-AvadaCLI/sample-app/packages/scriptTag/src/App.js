import React, { useState } from 'react'
import ToastMessage from './components/ToastMessage'
import useGetSettings from './hooks/useGetSettings'
import useDisplayNotify from './hooks/useDisplayNotify'

const App = () => {
    const { loading, data } = useGetSettings()
    const [currentNotifyIdx, setCurrentNotifyIdx] = useState(-1)

    useDisplayNotify({ loading, data, currentNotifyIdx, setCurrentNotifyIdx })

    return (
        <div style={{ backgroundColor: 'lightgray' }}>
            {!loading &&
                data &&
                currentNotifyIdx >= 0 &&
                (data?.notifications[currentNotifyIdx] ? (
                    <ToastMessage
                        notification={data?.notifications[currentNotifyIdx]}
                        setting={data?.setting}
                    />
                ) : null)}
        </div>
    )
}

App.displayName = 'App'

export default App
