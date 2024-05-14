import Router from 'koa-router'
import { getProducts } from '../handlers/products/productsHandler.js'

const router = new Router()

router.get('/', getProducts)

export default router
