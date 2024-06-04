import jwt from 'jsonwebtoken'

const generateJWT = (id, ctx) => {
    const token = jwt.sign({ id }, process.env.HASH_KEY, {
        expiresIn: '30d',
    })

    ctx.cookies.set('_auth', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: true,
    })
}

export default generateJWT
