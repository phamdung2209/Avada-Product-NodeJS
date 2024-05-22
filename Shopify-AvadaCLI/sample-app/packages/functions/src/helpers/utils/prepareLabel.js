import {formatNumber} from './formatNumber';

/**
 * @param {string|number} count
 * @param {string} singular
 * @param {string} plural
 * @returns {string}
 */
export default function prepareLabel(count, singular = 'item', plural = '') {
  const value = formatNumber(parseFloat(count), 2);
  let unit = Math.abs(count) <= 1 ? singular : plural;
  if (!unit && singular) {
    unit = singular + 's';
  }
  return [value, unit].join(' ');
}
