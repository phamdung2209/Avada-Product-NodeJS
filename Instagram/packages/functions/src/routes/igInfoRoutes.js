import {
    getMe,
    getMedia,
    handleAuthInstagram,
    handleAuthInstagramCallback,
    authMe,
    logoutUser,
    getSettings,
} from '@functions/controllers/IgController'
import { protectRoute } from '@functions/middleware/protectRoute'
import Router from 'koa-router'

const router = new Router({
    prefix: '/ig/me',
})

router.get('/', getMe)
router.get('/auth', authMe)
router.post('/logout', logoutUser)
router.get('/settings', protectRoute, getSettings)

router.post('/media', protectRoute, getMedia)
router.get('/auth/instagram', handleAuthInstagram)
router.get('/auth/instagram/callback', handleAuthInstagramCallback)

export default router
