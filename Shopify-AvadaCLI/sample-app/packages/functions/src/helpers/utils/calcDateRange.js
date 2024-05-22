export default function calcDateRange(start, end = new Date()) {
  const endDate = new Date(end);
  const startDate = new Date(start);
  return Math.abs((startDate - endDate) / (1000 * 60 * 60 * 24));
}
