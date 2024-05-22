/**
 * Compare 2 specified item in a list
 * Use ID counter to compare in case of duplicated item's ID,
 * which is the number of item ID existence
 *
 * @returns {boolean}
 */
export default function compareIdCounter(x1, x2, field1 = 'id', field2 = 'idCounter') {
  const [val1, val2] = [x1, x2].map(obj => [obj[field1], obj[field2]].filter(x => x).join('-'));
  return val1 === val2;
}
