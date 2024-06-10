import {
    handleAuthInstagram,
    handleAuthInstagramCallback,
} from '@functions/controllers/IgController'
import Router from 'koa-router'

const router = new Router({
    prefix: '/ig/me',
})

router.get('/auth/instagram', handleAuthInstagram)
router.get('/auth/instagram/callback', handleAuthInstagramCallback)

export default router
