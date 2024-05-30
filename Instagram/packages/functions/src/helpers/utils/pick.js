/**
 * Pick object by key
 *
 * @param object
 * @param keys
 * @returns {*}
 */
export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
