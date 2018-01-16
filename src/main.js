import { Application } from '@rsuite/framework/src/application';

const app = new Application({
  config: require('./config'),
  reducers: require('./reducers'),
  routes: require('./routes'),
  locales: require('./locales')
});


app.start('#mount');