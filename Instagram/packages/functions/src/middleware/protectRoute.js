import { decryptToken } from '@functions/helpers/utils/ig/hashToken'
import { getUser } from '@functions/repositories/IgRepository'

export const protectRoute = async (ctx, next) => {
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

        // const access_token = decryptToken(user.accessTokenHash)

        // OTHER LOGIN
        const currentUser = await getUser()

        if (currentUser.error) {
            throw new Error(currentUser.error)
        }

        const expires_in =
            currentUser.data.expires_in * 1000 + new Date(currentUser.data.createdAt).getTime()

        if (expires_in < Date.now()) {
            throw new Error('Unauthorized - Token Expired')
        }

        const access_token = decryptToken(currentUser.data.accessTokenHash)
        console.log('access_token: ', access_token)
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
