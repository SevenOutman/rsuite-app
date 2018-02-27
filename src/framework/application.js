/* eslint-disable global-require,no-underscore-dangle */
import BaseApplication from '@rsuite/framework/application';
import {
  requireConfig, requireLayouts, requireLocales, requireModels, requireReducers,
} from './require';

export default class Application extends BaseApplication {
  constructor() {
    super();
    // load config first
    this.registerConfig(requireConfig());

    // app local requires
    this.registerStore(require('../reducers'));

    // framework requires
    this.registerRoutes();
    this.registerLocales(requireLocales());
    this.registerLayouts(requireLayouts());
    // if config.useORM
    this.registerModels(requireModels());
  }

  /**
   * @override
   */
  registerRoutes() {
    const pageRoutes = this.createPagesRoutes();
    super.registerRoutes(pageRoutes);
  }

  /**
   * Traverse `pages` directory and generates route object
   * Based on scripts/route.js generate()
   */
  createPagesRoutes() {
    // 1. pre-generated
    // return require('../routes');

    // 2. runtime
    const context = require.context('../pages', true, /\.js$/);
    let routes = {};
    let routeStack = [routes];
    context.keys().sort().forEach((module) => {
      let routePath = module
        .replace(/^\.\/(.+)\.js$/, '$1')
        .replace(/_(?=\w.*\/?)/g, ':');
      let pageComp = context(module);
      let namespace = routeStack.slice(1).map(route => route.path).join('/');
      let isInNamespace = namespace === '' || routePath.startsWith(`${namespace}/`);
      while (!isInNamespace) {
        routeStack.pop();
        namespace = routeStack.slice(1).map(route => route.path).join('/');
        isInNamespace = namespace === '' || routePath.startsWith(`${namespace}/`);
      }
      let currentRoute = routeStack[routeStack.length - 1];
      let routePathSeg = routePath.substring(namespace === '' ? 0 : namespace.length + 1);
      if (routePathSeg === 'index') {
        currentRoute.indexRoute = {
          component: pageComp,
        };
      } else {
        let nextRoute = {
          path: routePathSeg,
          component: pageComp,
        };
        if (!currentRoute.childRoutes) {
          currentRoute.childRoutes = [];
        }
        currentRoute.childRoutes.push(nextRoute);
        routeStack.push(nextRoute);
      }
    });
    return routes;
  }
}
