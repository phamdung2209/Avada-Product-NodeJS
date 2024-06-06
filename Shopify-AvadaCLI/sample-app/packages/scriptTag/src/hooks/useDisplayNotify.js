import { useEffect } from 'react'
import PropTypes from 'prop-types'

const useDisplayNotify = ({ loading, data, currentNotifyIdx, setCurrentNotifyIdx }) => {
  /**
   * Toi uu logic phan nay
   */
    useEffect(() => {
        if (!loading && data?.notifications.length && currentNotifyIdx < 0) {
            const timerFirstDelay = setTimeout(() => {
                setCurrentNotifyIdx(0)
            }, data.setting.firstDelay * 1000)

            return () => clearTimeout(timerFirstDelay)
        }
    }, [loading])

    useEffect(() => {
        if (!loading && data?.notifications.length) {
            let timer = setTimeout(() => {
                if (currentNotifyIdx < 0) return

                setCurrentNotifyIdx((prev) => {
                    if (prev < data.setting.maxPopsDisplay - 1) {
                        return prev + 1
                    }
                })
            }, data.setting.popsInterval * 1000)

            return () => clearTimeout(timer)
        }
    }, [data, currentNotifyIdx])
}

useDisplayNotify.displayName = 'useDisplayNotify'
useDisplayNotify.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    currentNotifyIdx: PropTypes.number,
    setCurrentNotifyIdx: PropTypes.func,
}

export default useDisplayNotify
