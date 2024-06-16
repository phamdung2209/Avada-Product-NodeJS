const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    addWebpackAlias({
        ['@assets']: path.resolve(__dirname, 'src/assets'),
    }),
    useBabelRc(),
)
