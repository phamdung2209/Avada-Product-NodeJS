import {getCurrentUser} from '@functions/helpers/auth';

/**
 * @param {*} err
 * @param {*} ctx
 * @return {Promise<void>}
 */
export function handleError(err, ctx) {
  const user = getCurrentUser(ctx);
  if (user) {
    console.error('handle error ===', user.shopID, '===', user.shop?.shopifyDomain, '===', err);
  } else {
    console.error('Unauthenticated', err);
  }
}
