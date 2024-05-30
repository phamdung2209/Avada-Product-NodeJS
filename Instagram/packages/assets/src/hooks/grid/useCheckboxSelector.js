import {useState} from 'react';
import compareIdCounter from '@functions/helpers/utils/compareIdCounter';

/**
 * @param items
 * @param findItem
 * @returns {{setCheckedItems: (value: (((prevState: *[]) => *[]) | *[])) => void, handleCheckItem: handleCheckItem, isCheckedAll: ((function(*=): (boolean|"indeterminate"))|*), checkedItems: *[], handleCheckAll: handleCheckAll, isChecked: (function(*, *=): boolean)}}
 */
export default function useCheckboxSelector({items = [], findItem = compareIdCounter}) {
  const [checkedItems, setCheckedItems] = useState([]);

  /**
   * @returns {boolean}
   */
  const isChecked = (item, list = checkedItems) => !!list.find(x => findItem(x, item));

  const handleCheckItem = item => {
    setCheckedItems(prev => {
      return isChecked(item, prev) ? prev.filter(x => !findItem(x, item)) : [...prev, item];
    });
  };

  /**
   * @returns {boolean | 'indeterminate'}
   */
  const isCheckedAll = (list = items) => {
    if (!list.length) {
      return false;
    }
    if (list.every(item => checkedItems.find(check => findItem(check, item)))) {
      return true;
    }
    if (list.some(item => checkedItems.find(check => findItem(check, item)))) {
      return 'indeterminate';
    }
    return false;
  };

  const handleCheckAll = (checked = true, list = items) => {
    setCheckedItems(prev => {
      return checked
        ? [...prev, ...list.filter(item => !prev.find(p => findItem(p, item)))]
        : prev.filter(p => !list.find(item => findItem(p, item)));
    });
  };

  return {checkedItems, setCheckedItems, isChecked, handleCheckItem, isCheckedAll, handleCheckAll};
}
