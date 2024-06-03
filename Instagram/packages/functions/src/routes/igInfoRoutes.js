import { getMedia, getIgMe } from '@functions/controllers/getMedia'
import Router from 'koa-router'

const router = new Router({
    prefix: '/ig/me',
})

router.get('/', getIgMe)
router.get('/media', getMedia)

export default router
