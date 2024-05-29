const path = require('path')
const Dotenv = require('dotenv-webpack')

const isProduction = process.env.NODE_ENV === 'production'
const environmentPath = !process.env.ENVIRONMENT ? '.env' : `.env.${process.env.ENVIRONMENT}`

/**
 * @link https://stackoverflow.com/questions/47830273/babel-plugin-preset-files-are-not-allowed-to-export-objects-only-functions
 * @link https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
 */
module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, '../../static/scripttag'),
        filename: 'index.min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
    stats: {
        colors: true,
    },
    devtool: isProduction ? false : 'eval-source-map',
    plugins: [
        new Dotenv({
            safe: false,
            defaults: '.env.example',
            systemvars: true,
            path: path.resolve(__dirname, environmentPath),
        }),
    ],
}

// // index.js and index.html
// module.exports = {
//     mode: isProduction ? 'production' : 'development',
//     entry: ['./src/index.js', './src/index.html'],
//     output: {
//         path: path.resolve(__dirname, '../../static/scripttag'),
//         filename: 'index.min.js',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//             },
//             {
//                 test: /\.html$/,
//                 loader: 'file-loader',
//                 options: {
//                     name: '[name].[ext]',
//                 },
//             },
//         ],
//     },
//     stats: {
//         colors: true,
//     },
//     devtool: isProduction ? false : 'eval-source-map',
//     plugins: [
//         new Dotenv({
//             safe: false,
//             defaults: '.env.example',
//             systemvars: true,
//             path: path.resolve(__dirname, environmentPath),
//         }),
//     ],
// }
