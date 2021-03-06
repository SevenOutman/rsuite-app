/* eslint-disable global-require */
module.exports = {
  indexRoute: {
    component: require('../pages/index.js')
  },
  childRoutes: [
    {
      path: 'events',
      component: require('../pages/events.js'),
      indexRoute: {
        component: require('../pages/events/index.js')
      }
    },
    {
      path: 'login',
      component: require('../pages/login.js'),
      indexRoute: {
        component: require('../pages/login/index.js')
      }
    },
    {
      path: 'repos',
      component: require('../pages/repos.js'),
      indexRoute: {
        component: require('../pages/repos/index.js')
      }
    },
    {
      path: 'users',
      component: require('../pages/users.js'),
      indexRoute: {
        component: require('../pages/users/index.js')
      }
    },
    {
      path: '*',
      component: require('@rsuite/framework/pages').ErrorNotFound
    }
  ]
};
