import * as functions from 'firebase-functions';

const {shopify} = functions.config();

export default {
  secret: shopify.secret,
  apiKey: shopify.api_key,
  firebaseApiKey: shopify.firebase_api_key,
  accessTokenKey: shopify.access_token_key,
  embedAppId: shopify.embed_app_id,
  scopes: shopify.scopes?.split(',') || ['read_themes', 'write_themes']
};
