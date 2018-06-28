/* eslint key-spacing:0 */
import webpack from 'webpack'
import _debug from 'debug'
import config from '../../config'

const debug = _debug('app:webpack:development')

export default webpackConfig => {
  webpackConfig.devtool = config.compiler_devtool
  debug('Enable Hot Module Replacement (HMR).')
  webpackConfig.entry.app.push(
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  )

  debug('Enable presets for live development (react-hmre).')
  webpackConfig.module.rules.filter(loader => {
    return loader.loader && /babel/.test(loader.loader)
  }
  ).forEach(loader => {
    loader.options.presets.push('react-hmre')
  })

  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )

  return webpackConfig
}
