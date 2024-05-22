import {useEffect, useState} from 'react';
import {api} from '@assets/helpers';
import queryString from 'query-string';
import {handleError} from '@assets/services/errorService';

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
  initLoad = true,
  presentData = null,
  initQueries = {}
}) {
  const [loading, setLoading] = useState(initLoad);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState(defaultData);
  const [additionalData, setAdditionalData] = useState({});
  const [pageInfo, setPageInfo] = useState({});
  const [count, setCount] = useState(0);

  async function fetchApi(apiUrl, params = null, keepPreviousData = false) {
    try {
      setLoading(true);
      const path = apiUrl || url;
      const separateChar = path.includes('?') ? '&' : '?';
      const query = params ? separateChar + queryString.stringify(params) : '';
      const resp = await api(path + query);
      if (resp.hasOwnProperty('pageInfo')) setPageInfo(resp.pageInfo);
      if (resp.hasOwnProperty('count')) setCount(resp.count);
      if (resp.hasOwnProperty('additionalData')) {
        setAdditionalData(resp.additionalData);
      }
      if (resp.hasOwnProperty('data')) {
        let newData = presentData ? presentData(resp.data) : resp.data;
        if (!Array.isArray(newData)) {
          newData = {...defaultData, ...newData};
        }
        setData(prev => {
          if (!keepPreviousData) {
            return newData;
          }
          return Array.isArray(newData) ? [...prev, ...newData] : {...prev, ...newData};
        });
      }
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  useEffect(() => {
    if (initLoad && !fetched) {
      fetchApi(url, initQueries).then(() => {});
    }
  }, []);

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
    setFetched
  };
}
