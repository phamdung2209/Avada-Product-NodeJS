export default function cleanEmptyField(obj) {
  return Object.keys(obj).reduce((prev, field) => {
    const value = obj[field];
    return ['', null, undefined, false].includes(value) ? prev : {...prev, [field]: value};
  }, {});
}
