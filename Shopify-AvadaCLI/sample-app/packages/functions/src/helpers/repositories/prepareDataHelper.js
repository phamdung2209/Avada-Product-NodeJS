/**
 * @param postData
 * @param excludeKeys
 * @param formatData
 * @returns {*}
 */
export function prepareSaveData(postData, excludeKeys = [], formatData = val => val) {
  const {
    // eslint-disable-next-line no-unused-vars
    id,
    // eslint-disable-next-line no-unused-vars
    _id,
    // eslint-disable-next-line no-unused-vars
    incrementId,
    // eslint-disable-next-line no-unused-vars
    isRowChecked,
    // eslint-disable-next-line no-unused-vars
    isRowExpanded,
    // eslint-disable-next-line no-unused-vars
    isChild,
    // eslint-disable-next-line no-unused-vars
    childCustomTable,
    // eslint-disable-next-line no-unused-vars
    createdAt,
    // eslint-disable-next-line no-unused-vars
    updatedAt,
    ...data
  } = postData;
  /* eslint-enable no-unused-vars */
  excludeKeys.forEach(key => {
    delete data[key];
  });
  return formatData(data);
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
