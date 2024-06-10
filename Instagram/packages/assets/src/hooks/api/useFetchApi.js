import { useEffect, useState } from 'react'
import { api, fetchAuthenticatedApi } from '@assets/helpers'
import queryString from 'query-string'
import { handleError } from '@assets/services/errorService'

/**
 * useFetchApi hook for fetch data from api with url
 *
 * @param {string} url
 * @param defaultData
 * @param {boolean} initLoad
 * @param presentData
 * @param initQueries
 * @returns {{pageInfo: {}, data, setData, count, setCount, fetchApi, loading, fetched}}
 */
export default function useFetchApi({
    url,
    defaultData = [],
    initLoad = false,
    presentData = null,
    initQueries = {},
    method = 'GET',
    allowFetch = true,
    options = {},
    isResetData = false,
}) {
    const [loading, setLoading] = useState(initLoad)
    const [fetched, setFetched] = useState(false)
    const [data, setData] = useState(defaultData)
    const [additionalData, setAdditionalData] = useState({})
    const [pageInfo, setPageInfo] = useState({})
    const [count, setCount] = useState(0)

    const fetchApi = async (apiUrl = url, params = null, keepPreviousData = false) => {
        try {
            setLoading(true)
            const path = apiUrl || url
            const separateChar = path.includes('?') ? '&' : '?'
            const query = params ? separateChar + queryString.stringify(params) : ''

            // const resp = await api({
            //     url: path + query,
            //     method,
            //     clientConfig: {
            //         baseURL: '/',
            //         timeout: 0,
            //     },
            //     options,
            // })
            const resp = await fetchAuthenticatedApi(path + query, {
                method,
                ...options,
            })

            if (resp.hasOwnProperty('pageInfo')) setPageInfo(resp.pageInfo)
            if (resp.hasOwnProperty('count')) setCount(resp.count)
            if (resp.hasOwnProperty('additionalData')) {
                setAdditionalData(resp.additionalData)
            }
            if (resp.hasOwnProperty('data')) {
                let newData = presentData ? presentData(resp.data) : resp.data
                if (!Array.isArray(newData)) {
                    newData = { ...defaultData, ...newData }
                }
                setData((prev) => {
                    if (!keepPreviousData) {
                        return newData
                    }
                    return Array.isArray(newData) ? [...prev, ...newData] : { ...prev, ...newData }
                })
            }
        } catch (e) {
            handleError(e)
        } finally {
            setLoading(false)
            setFetched(true)
        }
    }

    useEffect(() => {
        if (isResetData) {
            setData(defaultData)
            return
        }

        if (!allowFetch) return

        fetchApi(url, initQueries)
    }, [allowFetch, isResetData])

    return {
        fetchApi,
        data,
        setData,
        additionalData,
        pageInfo,
        count,
        setCount,
        loading,
        fetched,
        setFetched,
    }
}
