/**
 * Format a number to given format
 *
 * @param num
 * @param toFixed
 * @returns {string}
 */
export const formatNumber = (num, toFixed = 2) => {
  if (!num) return '0';
  const nf = new Intl.NumberFormat();
  return nf.format(parseFloat(parseFloat(num).toFixed(toFixed)));
};

export const formatCurrency = (
  num,
  toFixed = 2,
  locale = 'en-US',
  style = {
    style: 'currency',
    currency: 'USD'
  }
) => {
  if (!num) return '0';
  const nf = new Intl.NumberFormat(locale, style);
  return nf.format(parseFloat(parseFloat(num).toFixed(toFixed)));
};
