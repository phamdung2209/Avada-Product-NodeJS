import { getDataClient } from '@functions/controllers/clientController'
import Router from 'koa-router'

const router = new Router({
    prefix: '/client',
})

router.get('/data', getDataClient)

export default router
