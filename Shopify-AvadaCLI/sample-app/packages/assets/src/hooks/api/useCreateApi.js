import {useState} from 'react';
import {api} from '@assets/helpers';
import {useStore} from '@assets/reducers/storeReducer';
import {setToast} from '@assets/actions/storeActions';
import {handleError} from '@assets/services/errorService';

/**
 * @param url
 * @param fullResp
 * @param successMsg
 * @param errorMsg
 * @returns {{creating: boolean, handleCreate}}
 */
export default function useCreateApi({
  url,
  fullResp = false,
  successMsg = 'Saved successfully',
  errorMsg = 'Failed to save'
}) {
  const {dispatch} = useStore();
  const [creating, setCreating] = useState(false);

  /**
   * @param data
   * @returns {Promise<{success: boolean, error}>}
   */
  const handleCreate = async data => {
    try {
      setCreating(true);
      const resp = await api(url, {body: {data}, method: 'POST'});
      if (resp.success) {
        setToast(dispatch, resp.message || successMsg);
      }
      if (resp.error) {
        setToast(dispatch, resp.error, true);
      }
      return fullResp ? resp : resp.success;
    } catch (e) {
      handleError(e);
      setToast(dispatch, errorMsg, true);
      return fullResp ? {success: false, error: e.message} : false;
    } finally {
      setCreating(false);
    }
  };

  return {creating, handleCreate};
}
