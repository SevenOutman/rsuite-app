/**
 * import styles
 */
require('./less/index.less');

/**
 * start Application
 */
import { Application } from './framework';

const app = new Application(require('./config'));
app.start('#mount');
