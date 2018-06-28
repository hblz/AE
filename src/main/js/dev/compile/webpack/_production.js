import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import _debug from 'debug'

const debug = _debug('app:webpack:production')

export default webpackConfig => {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.rules.filter(loader =>
    loader.use && loader.use.find(name => /style/.test(name))
  ).forEach(loader => {
    loader.use.splice(0, 1, MiniCssExtractPlugin.loader)
    // const [first, ...rest] = loader.use
    // loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    // delete loader.loaders
  })

  debug('Apply ExtractText and UglifyJS plugins.')
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash].css`,
      chunkFilename: `[id].[contenthash].css`
    }),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 20000}),
    new webpack.optimize.OccurrenceOrderPlugin(),
  )

  return webpackConfig
}
