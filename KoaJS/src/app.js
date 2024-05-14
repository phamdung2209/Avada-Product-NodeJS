import Koa from 'koa'
import Router from 'koa-router'
import userRoutes from './routes/user.route.js'

const app = new Koa()
app.proxy = true
const router = new Router()
app.use(router.routes())

router.use('/api/users', userRoutes.routes())

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
