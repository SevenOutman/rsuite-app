/* eslint-disable global-require,no-underscore-dangle */
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import BaseApplication from '@rsuite/framework/application';
import authReducer from '@rsuite/framework/internals/Auth/reducer';

const middlewares = [thunkMiddleware];
/** redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export class Application extends BaseApplication {
  constructor() {
    super();

    this.registerStore();
    this.registerRoutes();
  }

  registerStore() {
    this.register('store', createStore(
      combineReducers({
        framework: combineReducers({
          auth: authReducer,
        }),
        store: require('../reducers'),
        routing: routerReducer,
      }), composeEnhancers(applyMiddleware(...middlewares)),
    ));
  }

  registerRoutes() {
    const pages = require('../routes');

    this.register('routes', Object.assign({}, {
      path: '/',
      component: require('../containers/Index').default,
    }, pages));
  }
}
