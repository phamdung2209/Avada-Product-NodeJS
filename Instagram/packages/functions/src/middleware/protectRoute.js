import { decryptToken } from '@functions/helpers/utils/ig/hashToken'
import { getUserById } from '@functions/repositories/IgRepository'
import jwt from 'jsonwebtoken'

export const protectRoute = async (ctx, next) => {
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

        const access_token = decryptToken(user.accessTokenHash)

        ctx.user = {
            ...user,
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
