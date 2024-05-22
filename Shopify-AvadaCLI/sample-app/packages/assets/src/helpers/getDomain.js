/**
 * Return shop domain, if empty or blank return shopifyDomain instead
 *
 * @param shop
 * @returns {*}
 */
export default function getDomain(shop = {}) {
  const {domain, shopifyDomain} = shop;

  if (domain) {
    return domain.replace('https://', '').replace('http://', '');
  }

  return shopifyDomain || '';
}
