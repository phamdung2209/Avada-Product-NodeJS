const fullMonthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function formatBothDateTime(datetime = new Date(), timeZone = '') {
  return formatDateOnly(datetime, timeZone) + ' ' + formatTimeOnly(datetime, timeZone);
}

export function formatDateOnly(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return fullMonthList[result.getMonth()] + ' ' + result.getDate() + ', ' + result.getFullYear();
}

export function formatDateRaw(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return [
    result.getFullYear(),
    zeroSuffix(result.getMonth() + 1),
    zeroSuffix(result.getDate())
  ].join('/');
}

export function formatTimeOnly(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return [zeroSuffix(result.getHours()), zeroSuffix(result.getMinutes())].join(':');
}

function zeroSuffix(str) {
  return ('0' + str).slice(-2);
}
