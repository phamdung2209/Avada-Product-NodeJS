const path = require('path')
const Dotenv = require('dotenv-webpack')

const isProduction = process.env.NODE_ENV === 'production'
const environmentPath = !process.env.ENVIRONMENT ? '.env' : `.env.${process.env.ENVIRONMENT}`

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, '../../static/scripttag'),
        filename: 'index.min.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '~': path.resolve(__dirname, '../'),
            '@functions': path.resolve(__dirname, '../functions/src'),
            '@assets': path.resolve(__dirname, '../assets/src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // Nếu file nhỏ hơn 8kb, sẽ được inline dưới dạng base64
                            name: '[path][name].[ext]', // Giữ nguyên tên và đường dẫn file
                        },
                    },
                ],
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
