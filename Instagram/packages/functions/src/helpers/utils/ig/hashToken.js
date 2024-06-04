import * as crypto from 'crypto'

export const encryptToken = (access_token) => {
    const key = crypto.scryptSync(process.env.HASH_KEY, 'salt', 32)
    const iv = Buffer.alloc(16, 0)

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(access_token, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
}

export const decryptToken = (encrypted) => {
    const key = crypto.scryptSync(process.env.HASH_KEY, 'salt', 32)
    const iv = Buffer.alloc(16, 0)

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}
