import {isEmpty} from '@avada/utils';
import {makeGraphQlApi} from '../../helpers/api';
import {initShopify} from '../../services/shopifyService';
import {META_FIELD_KEY, META_FIELD_NAMESPACE} from '../../const/metafields';
import {getShopById} from '../../repositories/shopRepository';

/**
 *
 * @param shopId
 * @param changeAccount
 * @returns {Promise<void>}
 */
export async function updateMetaField(shopId, changeAccount = false) {
  const shop = await getShopById(shopId, false);
  const shopify = initShopify(shop);

  await Promise.all([
    createOrUpdateMetaField({
      shopify,
      value: {
        shopId
      }
    })
  ]);
}

/**
 *
 * @param namespace
 * @param value
 * @param key
 * @param shopify
 * @returns {Promise<void>}
 */
export async function createOrUpdateMetaField({
  value,
  shopify,
  namespace = META_FIELD_NAMESPACE,
  key = META_FIELD_KEY
}) {
  const {shopName: shopifyDomain, accessToken} = shopify.options;
  const metafieldOwner = {namespace, key};
  const metafieldData = {value: JSON.stringify(value), type: 'json'};

  const metafields = await shopify.metafield.list(metafieldOwner);

  if (isEmpty(metafields)) {
    console.log('Create meta field', shopifyDomain);
    await shopify.metafield.create({...metafieldOwner, ...metafieldData});
    if (namespace === META_FIELD_NAMESPACE) {
      await exposeMetafield({shopifyDomain, accessToken});
    }
    return;
  }

  console.log('Update meta field', shopifyDomain, value.shopId);
  await Promise.all(metafields.map(({id}) => shopify.metafield.update(id, metafieldData)));
}

/**
 *
 * @param shopify
 * @param namespace
 * @param key
 * @returns {Promise<void>}
 */
export async function deleteMetaField(
  shopify,
  namespace = META_FIELD_NAMESPACE,
  key = META_FIELD_NAMESPACE
) {
  const metafieldOwner = {namespace, key};
  const metafields = await shopify?.metafield.list(metafieldOwner);

  if (!isEmpty(metafields)) {
    await Promise.all(metafields.map(({id}) => shopify.metafield.delete(id)));
  }
}

/**
 * Exposing the meta field to the storefront API
 * @link https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/products-collections/metafields#step-1-expose-metafields
 *
 * @param accessToken
 * @param shopifyDomain
 * @param namespace
 * @param key
 * @return {Promise<*>}
 */
export async function exposeMetafield({
  accessToken,
  shopifyDomain,
  namespace = META_FIELD_NAMESPACE,
  key = META_FIELD_KEY
}) {
  try {
    const graphqlQuery = {
      query: `
        #graphql
        mutation {
          metafieldStorefrontVisibilityCreate(
            input: {
              namespace: "${namespace}"
              key: "${key}"
              ownerType: SHOP
            }
          ) {
            metafieldStorefrontVisibility {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `
    };

    await makeGraphQlApi({accessToken, shopifyDomain, graphqlQuery});
  } catch (e) {
    console.error('Failed to expose metafield', e);
  }
}
