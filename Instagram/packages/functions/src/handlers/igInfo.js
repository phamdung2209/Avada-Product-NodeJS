import App from 'koa'

import * as errorService from '../services/errorService'
import router from '@functions/routes/igInfoRoutes'

const app = new App()
app.proxy = true

app.use(router.allowedMethods())
app.use(router.routes())

app.on('error', errorService.handleError)

export default app
