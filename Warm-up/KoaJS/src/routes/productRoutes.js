import Router from 'koa-router'
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByName,
} from '../handlers/products/productsHandler.js'
import { protectedProduct } from '../middleware/productMiddleware.js'

const router = new Router()

router.get('/', getProducts)
router.post('/add', protectedProduct, createProduct)
router.put('/update/:id', protectedProduct, updateProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/search', getProductByName)

export default router
