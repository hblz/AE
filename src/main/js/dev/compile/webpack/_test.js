/* eslint key-spacing:0 */

export default webpackConfig => {
  webpackConfig.devtool = null
  webpackConfig.resolve.alias.sinon = 'sinon/pkg/sinon.js'
  webpackConfig.module.noParse = [/\/sinon\.js/]
  webpackConfig.module.loaders.push({
    test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
    loader: 'imports?define=>false,require=>false'
  })
  webpackConfig.externals = {
    ...webpackConfig.externals,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  }

  return webpackConfig
}
