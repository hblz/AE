import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../../config'
import _debug from 'debug'

const { utils_paths: paths, dir_client: app } = config
const debug = _debug('app:webpack:_base')
const { __TEST__ } = config.globals

debug('Create configuration.')

// Styles
const cssLoader = !config.compiler_css_modules
  ? {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }
  : {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: true,
      importLoaders: 1,
      localIdentName: `[name]__[local]___[hash:base64:5]`
    }
  }

const webpackConfig = {
  mode: config.env,
  name: 'client',
  target: 'web',
  resolve: {
    modules: [paths.base(app), 'node_modules'],
    extensions: ['.js', '.jsx', '.async.jsx', '.json'],
    alias: config.aliases
  },
  entry: {
    app: [
      paths.client('entry.jsx')
    ],
    vendor: config.compiler_vendor
  },
  output: {
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[chunkhash].js`,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
      title: '管理后台',
      template: paths.client('index.html'),
      hash: false,
      favicon: paths.client('static/images/favicon.png'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          compact: __TEST__ ? false : 'auto',
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
            ['import', {'libraryName': 'antd', 'style': 'true'}]
          ],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        include: /app/,
        use: [
          'style-loader',
          cssLoader,
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                cssnano({
                  sourcemap: true,
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions']
                  },
                  safe: true,
                  discardComments: {
                    removeAll: true
                  }
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                paths.base('node_modules/compass-mixins/lib'),
                paths.client('static/styles')
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: /app/,
        use: [
          'style-loader',
          cssLoader,
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                cssnano({
                  sourcemap: true,
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions']
                  },
                  safe: true,
                  discardComments: {
                    removeAll: true
                  }
                })
              ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          cssLoader,
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                cssnano({
                  sourcemap: true,
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions']
                  },
                  safe: true,
                  discardComments: {
                    removeAll: true
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: `images/[hash].[ext]`
        }
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: `media/[hash].[ext]`
        }
      },
      /* eslint-disable */
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: `fonts/[hash].[ext]`
        }
      }
      /* eslint-enable */
    ]
  }
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  // webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  //   names: ['vendor'],
  //   filename: `[name].[${config.compiler_hash_type}].js`
  // }))
  webpackConfig.optimization = {
    splitChunks: {
      chunks: 'all', // 只对入口文件处理
      cacheGroups: {
        vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          test: /node_modules\//,
          name: `page/vendor-[name].[${config.compiler_hash_type}]`,
          priority: 10,
          enforce: true
        },
        commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
          test: /common\/|components\//,
          name: `page/commons-[name].[${config.compiler_hash_type}]`,
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'page/manifest'
    }
  }
}

export default webpackConfig
