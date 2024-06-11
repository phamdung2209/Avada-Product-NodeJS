import { encryptToken } from '@functions/helpers/utils/ig/hashToken'
import { deleteAllUsers, userCallback } from '@functions/repositories/IgRepository'
import { getCurrentShop } from '@functions/helpers/auth'
import { createMedia, getMediaByShopId } from '@functions/repositories/mediaRepository'
import igApi from '@functions/helpers/igApi'
import { getSettingByUserId, updateFeedSettings } from '@functions/repositories/settingRepository'
import { getUserById } from '@functions/repositories/userRepository'

export const getMedia = async (ctx) => {
    try {
        const user = ctx.user
        const shopId = getCurrentShop(ctx)

        //  HANDLE STATUS 401 - REFRESH TOKEN

        // VERSION OTHER WAY
        const media = await getMediaByShopId(shopId)
        if (media.error) {
            throw new Error(media.error)
        }

        const data = media.data.flatMap((m) => {
            if (+m.userId === +user?.id) {
                return m.data
            }
        })

        ctx.body = {
            success: true,
            data,
        }
    } catch (error) {
        console.log('Error in getMedia: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const syncMedia = async (ctx) => {
    try {
        const user = ctx.user
        if (!user) throw new Error('User is not defined')

        const shopId = getCurrentShop(ctx)
        if (!shopId) throw new Error('Shop is not defined')

        const ig = new igApi()
        const data = await ig.getMedia(user?.access_token)

        if (data.error) {
            throw new Error(data.error)
        }

        // SYNC MEDIA
        const newMedia = await createMedia({ user, shopId, data })
        if (newMedia.error) {
            throw new Error(newMedia.error)
        }

        return (ctx.body = {
            success: true,
            message: newMedia.message,
        })
    } catch (error) {
        console.log('Error in syncMedia: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export const handleAuthInstagram = async (ctx) => {
    try {
        const ig = new igApi()
        const authURL = await ig.authInstagram()
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

        const ig = new igApi()
        const data = await ig.retrieveToken(code)
        if (data.error) {
            throw new Error(data.error)
        }

        const { access_token, user_id, permissions, expires_in } = data
        const { username } = await ig.getMe(access_token)

        const accessTokenHash = encryptToken(access_token)

        const updateToken = await userCallback({
            user_id,
            accessTokenHash,
            permissions,
            username,
            expires_in,
        })

        if (updateToken.error) {
            throw new Error(updateToken.error)
        }

        // SET COOKIE
        // generateJWT(user_id, ctx)

        // CLOSE POPUP WINDOW WITH SETTED COOKIE
        ctx.body = `
            <script>
                window.close()
            </script>
        `
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
        // const _auth = ctx.cookies.get('_auth')
        // if (!_auth) {
        //     throw new Error('Unauthorized - No Token Provided')
        // }

        // const decoded = jwt.verify(_auth, process.env.HASH_KEY)
        // if (!decoded) {
        //     throw new Error('Unauthorized - Invalid token')
        // }

        // const user = await getUserById({ user_id: decoded.id })

        // if (user.error) {
        //     throw new Error(user.error)
        // }

        // const { accessTokenHash, id } = user
        // const access_token = decryptToken(accessTokenHash)

        // const igUser = await getIgMe(access_token)

        // if (+igUser?.id !== +id) {
        //     ctx.cookies.set('_auth', '', { maxAge: 0 })
        //     throw new Error('Unauthorized - Invalid User')
        // }

        const user = ctx.user

        const shopId = getCurrentShop(ctx)
        if (!shopId) throw new Error('Shop is not defined')

        const media = await getMediaByShopId(shopId)
        if (media.error) throw new Error(media.error)

        if (!media.data.length) {
            await syncMedia(ctx)
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
        // ctx.cookies.set('_auth', '', { maxAge: 0 })
        const deleteAllData = await deleteAllUsers()
        if (deleteAllData.error) {
            throw new Error(deleteAllData.error)
        }

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
        const { id } = ctx.user

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
        const shopId = getCurrentShop(ctx)
        if (!shopId) throw new Error('Shop is not defined')

        const { id } = ctx.user
        const user = getUserById({ user_id: id })
        if (user.error) throw new Error(user.error)

        const update = await updateFeedSettings(ctx.req.body, id, shopId)
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
