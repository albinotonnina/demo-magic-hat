const rewireStyledComponents = require('react-app-rewire-styled-components')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const {injectBabelPlugin} = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env)
  config = rewireReactHotLoader(config, env)
  config = injectBabelPlugin(
    ['import', {libraryName: 'antd', style: true}],
    config
  )

  config = injectBabelPlugin('wildcard', config)

  config = rewireLess.withLoaderOptions({
    modifyVars: {'@primary-color': '#ff383f'}
  })(config, env)
  return config
}
