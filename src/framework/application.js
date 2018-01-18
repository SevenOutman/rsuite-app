/* eslint-disable global-require,no-underscore-dangle */
import BaseApplication from '@rsuite/framework/application';
import { requireConfig, requireLocales, requireModels, requireReducers, requireRoutes } from './require';

export default class Application extends BaseApplication {
  constructor() {
    super();
    // load config first
    this.registerConfig(requireConfig());

    // app local requires
    this.registerStore(require('../reducers'));
    this.registerRoutes();

    // framework requires
    this.registerLocales(requireLocales());
    // if config.useORM
    this.registerModels(requireModels());
  }

  /**
   *
   */
  registerRoutes() {
    const pageRoutes = this.createPagesRoutes();
    super.registerRoutes(pageRoutes);
  }

  createPagesRoutes() {
    // 1. pre-generated
    return require('../routes');

    // 2. runtime
    // const context = require.context('../pages', true, /\.js$/);
    // let routes = {};
    // let routeStack = [];
    // const pages = context.keys().sort().map((module) => {
    //   let routePath = module.replace(/^\.\/(.+)\.js$/, '$1');
    //   let pageComp = context(module);
    //   let namespace = routeStack.join('/');
    //   let isInNamespace = namespace === '' || routePath.startsWith(`${namespace}/`);
    // });
    // return {};
  }
}
