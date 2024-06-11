import IgApi from '@functions/helpers/igApi'
import { decryptToken, encryptToken } from '@functions/helpers/utils/ig/hashToken'
import { getUser, userCallback } from '@functions/repositories/IgRepository'

export const protectRoute = async (ctx, next) => {
    try {
        const currentUser = await getUser()

        if (currentUser.error) {
            throw new Error(currentUser.error)
        }

        const expires_in =
            currentUser.data.expires_in * 1000 + new Date(currentUser.data.createdAt).getTime()

        if (expires_in - 86400000 < Date.now()) {
            const accessToken = decryptToken(currentUser.data.accessTokenHash)

            const ig = new IgApi()

            const refreshToken = await ig.refreshToken(accessToken)
            if (refreshToken.error) {
                throw new Error(refreshToken.error)
            }

            const { access_token, expires_in } = refreshToken

            const accessTokenHash = encryptToken(access_token)

            const updateToken = await userCallback({
                user_id: currentUser.data.id,
                accessTokenHash,
                permissions: currentUser.data.permissions,
                username: currentUser.data.username,
                expires_in,
            })

            if (updateToken.error) {
                throw new Error(updateToken.error)
            }

            ctx.user = {
                ...currentUser.data,
                access_token,
            }

            return await next()
        }

        // ACCESS TOKEN NOT EXPIRED
        if (expires_in < Date.now()) {
            throw new Error('Unauthorized - Token Expired')
        }

        const access_token = decryptToken(currentUser.data.accessTokenHash)

        ctx.user = {
            ...currentUser.data,
            access_token,
        }

        await next()
    } catch (error) {
        console.log('Error in protectRoute middleware: ', error.message)
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}
