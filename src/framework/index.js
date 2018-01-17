/* eslint-disable global-require,no-underscore-dangle */
import BaseApplication from '@rsuite/framework/application';

export class Application extends BaseApplication {
  constructor(config) {
    super(config);

    this.registerStore(require('../reducers'));
    this.registerRoutes(require('../routes'));
    this.registerLocales(require('../locales'));

    // if config.useORM
    this.registerModels(require('../models'));
  }
}
