import Router from 'koa-router'
import { getProducts, createProduct } from '../handlers/products/productsHandler.js'
import { protectedProduct } from '../middleware/productMiddleware.js'

const router = new Router()

router.get('/', getProducts)
router.post('/add', protectedProduct, createProduct)

export default router
