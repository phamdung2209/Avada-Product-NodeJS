import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = {
        message: 'Server is running',
        status: 200,
    }
})

export default router
