import { params } from 'firebase-functions/v1'
import * as request from './utils/httpRequest'

const IG_GRAPH_BASE_URL = 'https://graph.instagram.com'
const IG_API_BASE_URL = 'https://api.instagram.com'

class IgApi {
    constructor() {
        this._clientId = process.env.INSTAGRAM_CLIENT_ID
        this._clientSecret = process.env.INSTAGRAM_CLIENT_SECRET
        this._redirectUri = 'https://ig.local.com/ig/me/auth/instagram/callback'
    }

    async authInstagram() {
        const authURL = `${IG_API_BASE_URL}/oauth/authorize?client_id=${this._clientId}&redirect_uri=${this._redirectUri}&scope=user_profile,user_media&response_type=code`
        return authURL
    }

    async retrieveToken(userCode) {
        const requestBody = new URLSearchParams({
            client_id: this._clientId,
            client_secret: this._clientSecret,
            code: userCode,
            grant_type: 'authorization_code',
            redirect_uri: this._redirectUri,
        })

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        }

        try {
            const data = await request.post(
                `${IG_API_BASE_URL}/oauth/access_token`,
                requestBody,
                headers,
            )

            const retrieveLongToken = await this.retrieveLongToken(data.access_token)

            return {
                user_id: data.user_id,
                permissions: data.permissions,
                ...retrieveLongToken,
                success: true,
            }
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    async retrieveLongToken(access_token) {
        const requestParams = new URLSearchParams({
            grant_type: 'ig_exchange_token',
            client_secret: this._clientSecret,
            access_token,
        })
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        }

        try {
            const data = await request.get(`${IG_GRAPH_BASE_URL}/access_token`, {
                params: requestParams,
                headers,
            })

            return data
        } catch (e) {
            return { access_token: false }
        }
    }

    async refreshToken(refresh_token) {
        const requestBody = new URLSearchParams({
            grant_type: 'ig_refresh_token',
            access_token: refresh_token,
        })

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        }

        try {
            const data = await request.get(`${IG_GRAPH_BASE_URL}/refresh_access_token`, {
                params: requestBody,
                headers,
            })

            return data
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    async getMe(accessToken) {
        const data = await request.get(`${IG_GRAPH_BASE_URL}/me`, {
            params: {
                fields: 'id,username',
                access_token: accessToken,
            },
        })

        return data
    }

    async getMedia(access_token) {
        try {
            const data = await request.get(`${IG_GRAPH_BASE_URL}/me/media`, {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url',
                    access_token,
                },
            })

            return data
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }

    async getMediaUrl(access_token, mediaId) {
        try {
            const data = await request.get(`${IG_GRAPH_BASE_URL}/${mediaId}`, {
                params: {
                    fields:
                        'media_url,caption,is_shared_to_feed,id,media_type,permalink,thumbnail_url,timestamp,username',
                    access_token,
                },
            })

            if (!data.media_url) {
                throw new Error('An error occurred while fetching media URL')
            }

            return data.media_url
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }
}

export default IgApi
