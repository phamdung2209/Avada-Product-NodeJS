export default function isNullOrUndefined(value) {
  return typeof value === 'undefined' || value === null || value === undefined;
}
