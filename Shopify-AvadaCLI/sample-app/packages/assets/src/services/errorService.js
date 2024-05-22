export function handleError(error) {
  console.error(error.response || error.toJSON?.() || error.message);
}
