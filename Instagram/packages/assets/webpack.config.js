/* tslint:disable */
const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {WebpackPluginServe} = require('webpack-plugin-serve');
const fs = require('fs');
const os = require('os');

const isProduction = process.env.NODE_ENV === 'production';
const environmentPath = !process.env.ENVIRONMENT ? '.env' : `.env.${process.env.ENVIRONMENT}`;
const isEmbeddedApp = process.env.IS_EMBEDDED_APP === 'yes';
const indexFile = isEmbeddedApp ? 'embed' : 'standalone';
const wpsPort = (process.env.WPS_PORT || 45000) + (isEmbeddedApp ? -5000 : 5000);

require('dotenv').config({path: path.resolve(__dirname, environmentPath)});

const [sslKey, sslCert] = ['ssl.key', 'ssl.crt'].map(file => {
  try {
    return fs.readFileSync(path.resolve(__dirname, '../../../ssl/' + file), 'utf8');
  } catch (e) {
    return null;
  }
});

const isHotReloadEnabled = sslKey && sslCert && !isProduction;

if (process.env.SHOPIFY_API_KEY) {
  try {
    if (!isProduction) {
      const runtimeFile = '../functions/.runtimeconfig.json';
      fs.readFile(runtimeFile, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const configData = JSON.parse(data);
        configData.app.base_url = process.env.HOST?.replace('https://', '');
        configData.shopify.api_key = process.env.SHOPIFY_API_KEY;
        configData.shopify.secret = process.env.SHOPIFY_API_SECRET;
        configData.shopify.embed_app_id = process.env.EMBED_APP_ID;
        fs.writeFileSync(runtimeFile, JSON.stringify(configData, null, 4));
      });

      updateEnvFile('.env.development', {
        SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY
      });
      updateEnvFile('../scripttag/.env.development', {
        SHOPIFY_CDN_URL: `${process.env.HOST}/scripttag/`,
        API_URL: process.env.HOST?.replace('https://', '')
      });
    }
  } catch (e) {
    console.error('Error changing the env file');
  }
}

/**
 *
 * @param file
 * @param data
 */
function updateEnvFile(file, data) {
  const ENV_VARS = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const keys = Object.keys(data);
  for (const key of keys) {
    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find(line => line.match(new RegExp(key))));
    const replaceIndex = target === -1 ? ENV_VARS.length - 1 : target;

    // replace the key/value with the new value
    ENV_VARS[replaceIndex] = `${key}=${data[key]}`;
  }

  // write everything back to the file system
  fs.writeFileSync(file, ENV_VARS.join(os.EOL));
}

const plugins = [
  new HtmlWebpackPlugin({
    filename: `${indexFile}.html`,
    template: path.resolve('webpack/html/index.html'),
    inject: true,
    hash: true,
    meta: {
      'theme-color': '#4285f4',
      description: 'An MAGEPLAZA Shopify application for Shopify'
    }
  }),
  new Dotenv({
    safe: false,
    defaults: '.env.example',
    systemvars: true,
    path: path.resolve(__dirname, environmentPath)
  }),
  isProduction &&
    new FaviconsWebpackPlugin({
      logo: path.resolve('webpack/icons/icon.png'),
      favicons: {
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true
        }
      }
    }),
  isProduction &&
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    }),
  isHotReloadEnabled &&
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [
        '!embed.html*',
        '!standalone.html*',
        `!${isEmbeddedApp ? 'standalone' : 'embed'}/**`
      ]
    }),
  isHotReloadEnabled &&
    new WebpackPluginServe({
      compress: true,
      historyFallback: true,
      hmr: 'refresh-on-failure',
      host: 'localhost',
      port: wpsPort,
      static: path.resolve(__dirname, '../../static'),
      status: false
    }),
  isHotReloadEnabled &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wps'
      }
    })
].filter(Boolean);

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: [
      path.resolve(__dirname, `src/${indexFile}.js`),
      isHotReloadEnabled && 'webpack-plugin-serve/client'
    ].filter(Boolean)
  },
  output: {
    path: path.resolve(__dirname, '../../static'),
    filename: `${indexFile}/js/[name]~[${isHotReloadEnabled ? 'hash' : 'contenthash'}].js`,
    chunkFilename: `${indexFile}/js/[name]~[contenthash].chunk.js`,
    publicPath: '/',
    pathinfo: false
  },
  devtool: isProduction ? false : 'eval-source-map',
  performance: {
    hints: isProduction ? 'warning' : false
  },
  plugins,
  optimization: {
    minimize: isProduction,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [isHotReloadEnabled && 'react-refresh/babel'].filter(Boolean)
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: 'file-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
