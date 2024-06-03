export const getMedia = async (ctx) => {
    try {
        console.log('getMedia', process.env.INSTAGRAM_ACCESS_TOKEN)

        const res = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
        )
        const data = await res.json()
        console.log('data', data)
        if (!data.data) {
            throw new Error('No data found')
        }

        ctx.body = data.data
    } catch (error) {
        console.log('Error in getMedia: ', error.message)
        ctx.body = {
            error: error.message,
        }
    }
}

export const getIgMe = async (ctx) => {
    try {
        const res = await fetch(
            `https://graph.instagram.com/me?fields=id,username&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
        )
        const data = await res.json()
        if (data instanceof Error) {
            throw new Error('Error getting user info')
        }

        ctx.body = data
    } catch (error) {
        console.log('Error in getIgMe: ', error.message)
        ctx.body = {
            error: error.message,
        }
    }
}
