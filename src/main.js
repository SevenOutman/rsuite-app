/**
 * import styles
 */
require('./less/index.less');

/**
 * start Application
 */
import Application from './framework/application';

const app = new Application();
app.start('#mount');
