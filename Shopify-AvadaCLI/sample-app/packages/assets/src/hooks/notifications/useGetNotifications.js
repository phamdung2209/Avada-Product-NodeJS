import {useCallback, useEffect, useState} from 'react';

import {fetchAuthenticatedApi} from '../../helpers';

const useGetNotifications = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getNotifications = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchAuthenticatedApi('/notifications');
            if (res.error) {
                throw new Error(res.error);
            }
            setData(res);
        } catch (error) {
            console.error('Error in getNotifications', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getNotifications();
    }, []);

    return {loading, data};
};

export default useGetNotifications;
