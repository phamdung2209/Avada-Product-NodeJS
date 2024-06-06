import axios from 'axios'
import jwt from 'jsonwebtoken'

import generateJWT from '@functions/helpers/utils/generateJWT'
import { decryptToken, encryptToken } from '@functions/helpers/utils/ig/hashToken'
import {
    asyncMedia,
    getSettingByUserId,
    getUserById,
    updateFeedSettings,
    updateIgMe,
} from '@functions/repositories/IgRepository'

export const getMedia = async (ctx) => {
    try {
        const user = ctx.user

        const data = await axios.get('https://graph.instagram.com/me/media', {
            params: {
                fields: 'id,caption,media_type,media_url,permalink,thumbnail_url',
                access_token: user?.access_token,
            },
        })

        // HANDLE STATUS 401 - REFRESH TOKEN

        const media = await asyncMedia(data.data.data, user)

        ctx.body = {
            success: true,
            data: media,
        }
    } catch (error) {
        console.log('Error in getMedia: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const getIgMe = async (access_token = process.env.INSTAGRAM_ACCESS_TOKEN) => {
    try {
        const res = await fetch(
            `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`,
        )

        const data = await res.json()

        if (data.error) {
            throw new Error('Error getting user info')
        }

        return data
    } catch (error) {
        console.log('Error in getIgMe: ', error.message)
        return null
    }
}

export const handleAuthInstagram = async (ctx) => {
    try {
        const authURL = `https://api.instagram.com/oauth/authorize?client_id=1149518076295500&redirect_uri=https://ig.local.com/ig/me/auth/instagram/callback&scope=user_profile,user_media&response_type=code`
        ctx.redirect(authURL)
    } catch (error) {
        console.log('Error in handleAuthInstagram: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const handleAuthInstagramCallback = async (ctx) => {
    try {
        const { code } = ctx.query

        if (!code) throw new Error('Authorization code not provided')

        const res = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'https://ig.local.com/ig/me/auth/instagram/callback',
                code: code,
            }).toString(),
        })
        const data = await res.json()
        if (data.error_message) {
            throw new Error(data.error_message)
        }

        const { access_token, user_id, permissions } = data
        const { username } = await getIgMe(access_token)
        console.log('username: ', username)
        const accessTokenHash = encryptToken(access_token)
        const updateToken = await updateIgMe({ user_id, accessTokenHash, permissions, username })
        if (updateToken.error) {
            throw new Error(updateToken.error)
        }

        // SET COOKIE
        generateJWT(user_id, ctx)

        // REDIRECT TO FRONT-END
        return ctx.redirect('https://ig.local.com')
    } catch (error) {
        console.log('Error in handleAuthInstagramCallback: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const authMe = async (ctx) => {
    try {
        const _auth = ctx.cookies.get('_auth')
        if (!_auth) {
            throw new Error('Unauthorized - No Token Provided')
        }

        const decoded = jwt.verify(_auth, process.env.HASH_KEY)
        if (!decoded) {
            throw new Error('Unauthorized - Invalid token')
        }

        const user = await getUserById({ user_id: decoded.id })

        if (user.error) {
            throw new Error(user.error)
        }

        const { accessTokenHash, id } = user
        const access_token = decryptToken(accessTokenHash)

        const igUser = await getIgMe(access_token)

        if (+igUser?.id !== +id) {
            ctx.cookies.set('_auth', '', { maxAge: 0 })
            throw new Error('Unauthorized - Invalid User')
        }

        ctx.body = {
            success: true,
            data: user,
        }
    } catch (error) {
        console.log('Error in authMe: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const logoutUser = async (ctx) => {
    try {
        ctx.cookies.set('_auth', '', { maxAge: 0 })
        ctx.body = {
            success: true,
            message: 'User logged out',
        }
    } catch (error) {
        console.log('Error in logoutUser: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const getSettings = async (ctx) => {
    try {
        const { id, username, access_token } = ctx.user

        const setting = await getSettingByUserId(id)
        if (setting.error) {
            throw new Error(setting.error)
        }

        return (ctx.body = {
            success: true,
            data: setting,
        })
    } catch (error) {
        console.log('Error in getSettings: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const updateSettings = async (ctx) => {
    try {
        const { id } = ctx.user
        const user = getUserById({ user_id: id })
        if (user.error) throw new Error(user.error)

        const update = await updateFeedSettings(ctx.req.body, id)
        if (update.error) throw new Error(update.error)

        ctx.body = {
            success: true,
            message: update.message,
        }
    } catch (error) {
        console.log('Error in updateSettings: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}
