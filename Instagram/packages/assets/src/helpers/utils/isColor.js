/**
 * @param {string} color
 * @return {boolean}
 */
export default function isColor(color) {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}
