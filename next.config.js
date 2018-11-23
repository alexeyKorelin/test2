const withSass = require('@zeit/next-sass')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const Settings = require('./config')

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = withSass({
  assetPrefix: isProd ? `${Settings.cdnHost}/next/current` : '',
  onDemandEntries: {
    // on dev, since our pages are so expensive, lets keep them for 24 hours
    maxInactiveAge: 1000 * 60 * 60 * 24
  },
  cssModules: true,
  cssLoaderOptions: {
    sourceMap: true,
    importLoaders: 2,
    localIdentName: '[local]__[hash:base64:5]',
  },
  webpack: (config, { buildId, dev, isServer }) => {
    config.resolve.extensions.push('.js', '.jsx')

    config.module.rules.push(
      {
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: './',
            outputPath: 'static/',
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    )

    return config
  }
})

module.exports = nextConfig