import App from 'koa'
import cors from 'koa2-cors'

import * as errorService from '../services/errorService'
import router from '@functions/routes/clientRoutes'

const app = new App()
app.use(cors())
app.proxy = true

app.use(router.allowedMethods())
app.use(router.routes())

app.on('error', errorService.handleError)
export default app
