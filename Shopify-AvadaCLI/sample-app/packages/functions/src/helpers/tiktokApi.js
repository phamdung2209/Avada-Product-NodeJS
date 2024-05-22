import socialConfig from '@functions/config/social';
import camelizeKeys from '@functions/helpers/utils/camelizeKeys';

const axios = require('axios');
const TIKTOK_BASE_URL = 'https://open.tiktokapis.com/v2';
const ERROR_CODE = 'ok';
class TiktokApi {
  constructor() {
    this._clientKey = socialConfig.tiktokClientKey;
    this._clientSecret = socialConfig.tiktokClientSecret;
    this._redirectUri = socialConfig.tiktokRedirectUri;
  }

  retrieveToken(userCode) {
    const requestBody = new URLSearchParams({
      client_key: this._clientKey,
      client_secret: this._clientSecret,
      code: userCode,
      grant_type: 'authorization_code',
      redirect_uri: this._redirectUri
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    };
    try {
      return axios
        .post(`${TIKTOK_BASE_URL}/oauth/token/`, requestBody, {headers})
        .then(response => {
          return response.data;
        });
    } catch (e) {
      return {refresh_token: false};
    }
  }

  refreshToken(refreshToken) {
    const requestBody = new URLSearchParams({
      grant_type: 'refresh_token',
      client_key: this._clientKey,
      client_secret: this._clientSecret,
      refresh_token: refreshToken
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    };

    try {
      return axios
        .post(`${TIKTOK_BASE_URL}/oauth/token/`, requestBody, {headers})
        .then(response => {
          return response.data;
        });
    } catch (e) {
      return {access_token: false};
    }
  }

  retrieveUserNode(accessToken, fields = 'open_id,display_name,profile_deep_link') {
    const url = `${TIKTOK_BASE_URL}/user/info/`;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    return axios.get(url, {headers, params: {fields}}).then(response => {
      const {error, ...restOfData} = response.data;
      if (error.code !== ERROR_CODE) {
        return [];
      }
      const {open_id: socialId, ...result} = restOfData.data.user;
      return camelizeKeys({...result, socialId});
    });
  }

  async retrieveUserMedia(
    accessToken,
    after = '',
    fields = 'id,cover_image_url,embed_link,title,create_time,duration,share_url'
  ) {
    const apiUrl = `${TIKTOK_BASE_URL}/video/list/`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    let cursor = null;
    let videoList = [];

    const requestData = {
      max_count: 20,
      cursor: cursor
    };
    if (after.length) {
      requestData.after = after;
    }
    do {
      const response = await axios.post(apiUrl, requestData, {headers, params: {fields}});
      const {error, ...restOfData} = response.data;
      if (error.code !== ERROR_CODE) {
        cursor = response.data.data.cursor;
        requestData.cursor = cursor;
      } else {
        cursor = response.data.data.cursor;
        requestData.cursor = cursor;
        videoList = [...videoList, ...restOfData.data.videos];
      }
    } while (cursor);
    return camelizeKeys(videoList);
  }
}

module.exports = TiktokApi;
