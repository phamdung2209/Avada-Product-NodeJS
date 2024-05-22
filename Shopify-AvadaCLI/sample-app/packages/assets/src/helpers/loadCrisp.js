/**
 * Load crisp SDK with session token
 *
 * @param {string} websiteId
 * @param {string} tokenId
 */
export default function loadCrisp(websiteId, tokenId) {
  window.$crisp = [];
  if (tokenId) {
    window.CRISP_TOKEN_ID = tokenId;
  }
  window.CRISP_WEBSITE_ID = websiteId;
  const d = document;
  const s = d.createElement('script');
  s.src = 'https://client.crisp.chat/l.js';
  s.defer = true;
  d.getElementsByTagName('head')[0].appendChild(s);

  return s;
}
