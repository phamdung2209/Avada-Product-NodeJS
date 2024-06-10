import { useEffect } from 'react'
import PropTypes from 'prop-types'

const useDisplayNotify = ({ loading, data, currentNotifyIdx, setCurrentNotifyIdx }) => {
    // Optimized
    useEffect(() => {
        if (!loading && data?.notifications.length) {
            if (currentNotifyIdx < 0) {
                const timerFirstDelay = setTimeout(() => {
                    setCurrentNotifyIdx(0)
                }, data.setting.firstDelay * 1000)

                return () => clearTimeout(timerFirstDelay)
            }

            let timer = setTimeout(() => {
                setCurrentNotifyIdx((prev) => {
                    if (prev < data.setting.maxPopsDisplay - 1) {
                        return prev + 1
                    }
                })
            }, data.setting.popsInterval * 1000)

            return () => clearTimeout(timer)
        }
    }, [loading, data, currentNotifyIdx, setCurrentNotifyIdx])
}

useDisplayNotify.displayName = 'useDisplayNotify'
useDisplayNotify.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    currentNotifyIdx: PropTypes.number,
    setCurrentNotifyIdx: PropTypes.func,
}

export default useDisplayNotify
