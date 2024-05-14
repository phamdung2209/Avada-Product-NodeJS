import Router from 'koa-router'
import { getBook, getBooks, save } from '../handlers/books/bookHandlers.js'
import validateBookInput from '../middleware/bookInputMiddleware.js'

const router = new Router()

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/add', validateBookInput, save)

export default router
