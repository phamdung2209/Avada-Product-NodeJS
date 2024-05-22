import {useState} from 'react';
import {api} from '@assets/helpers';
import {useStore} from '@assets/reducers/storeReducer';
import {setToast} from '@assets/actions/storeActions';
import {handleError} from '@assets/services/errorService';

/**
 * @param url
 * @returns {{deleting: boolean, handleDelete}}
 */
export default function useDeleteApi({url}) {
  const {dispatch} = useStore();
  const [deleting, setDeleting] = useState(false);

  /**
   * @param data
   * @returns {Promise<boolean>}
   */
  const handleDelete = async data => {
    try {
      setDeleting(true);
      const resp = await api(url, {body: {data}, method: 'DELETE'});
      if (resp.success) {
        setToast(dispatch, resp.message || 'Deleted successfully');
        return true;
      }
      if (resp.error) {
        setToast(dispatch, resp.error, true);
      }
    } catch (e) {
      handleError(e);
      setToast(dispatch, 'Failed to delete', true);
    } finally {
      setDeleting(false);
    }
  };

  return {deleting, handleDelete};
}
