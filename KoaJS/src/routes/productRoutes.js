import Router from 'koa-router'
import { getProducts, createProduct, updateProduct } from '../handlers/products/productsHandler.js'
import { protectedProduct } from '../middleware/productMiddleware.js'

const router = new Router()

router.get('/', getProducts)
router.post('/add', protectedProduct, createProduct)
router.put('/update/:id', protectedProduct, updateProduct)

export default router
