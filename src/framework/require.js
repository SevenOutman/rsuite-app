function resolve(module) {
  return module.replace(/^\.\/(.+)\.js$/, '$1');
}

function requireContextAsObject(context) {
  return context.keys().reduce((acc, module) => {
    return Object.assign(acc, {
      [resolve(module)]: context(module),
    });
  }, {});
}

function requireConfig() {
  const context = require.context('../config', false, /\.js$/);
  return requireContextAsObject(context);
}

function requireReducers() {
  const context = require.context('../reducers', false, /\.js$/);
  return requireContextAsObject(context);
}

function requireRoutes() {
  const context = require.context('../routes', false, /\.js$/);
  return requireContextAsObject(context);
}

function requireLocales() {
  const context = require.context('../locales', false, /\.js$/);
  return requireContextAsObject(context);
}

function requireModels() {
  const context = require.context('../models', false, /\.js$/);
  return requireContextAsObject(context);
}

module.exports = {
  requireConfig,
  requireReducers,
  requireRoutes,
  requireLocales,
  requireModels,
};
