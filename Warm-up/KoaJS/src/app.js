import Koa from 'koa'
import Router from 'koa-router'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'
import dotenv from 'dotenv'

import bookRoutes from './routes/bookRoutes.js'
import productRoutes from './routes/productRoutes.js'

const PORT = 8080
const app = new Koa()
const routes = new Router()
app.proxy = true

app.use(cors())
dotenv.config()
app.use(
    koaBody({
        multipart: true,
    }),
)
app.use(routes.routes())
app.use(routes.allowedMethods())

routes.use('/api/books', bookRoutes.routes())
routes.use('/api/products', productRoutes.routes())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
