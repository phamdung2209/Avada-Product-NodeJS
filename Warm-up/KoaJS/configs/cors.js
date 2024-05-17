export const configCors = (app) => {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.header('Access-Control-Allow-Credentials', 'true')

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200)
        }
        next()
    })
}
