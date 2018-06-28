import { Route } from 'react-router-dom'
import store from 'store'
import { auth, urlParams } from 'utils'

/**
 * Webpack code splitting, load on demand
 * @param component
 */
// const asyncLoad = component => (location, cb) => {
//   require(`dynamic?ext=async.jsx!modules/${component}`)(function (c) {
//     cb(null, c);
//   });
// }

/**
 * Go through the routes, add auth check function
 * @param routes react-router config
 * @param cb {Function} callback
 * @returns {Object} routes object
 */
const walk = (routes, cb) => {
  cb(routes);


  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => {
      if (routes.requireAuth) {
        if (route.requireAuth === undefined) {
          route.requireAuth = routes.requireAuth;
        }

        if (!route.roles && routes.roles) {
          route.roles = routes.roles;
        }
      }
      walk(route, cb)
    });
  }

  return routes;
}

export function logout(nextState, replaceState) {
  auth.destroy();
  store.dispatch({type: 'log_out'});
  replaceState(null, '/login');
}

export function goHomeIfLoggedIn(nextState, replaceState) {
  if (auth.isLogin()) {
    replaceState(null, '/');
  }
}

export default function withAuth(routes) {
  return walk(Route.createRouteFromReactElement(routes), route => {
    const oldOnEnter = route.onEnter;

    if (route.comp) {
      // route.getComponent = asyncLoad(route.comp);
    }

    if (route.indexRoute) {
      // route.indexRoute.getComponent = asyncLoad(route.indexRoute.comp);
    }

    route.onEnter = (nextState, replaceState) => {
      if (route.requireAuth) {
        if (!auth.isLogin()) {
          return replaceState({
            nextPathname: nextState.location.pathname,
            search: nextState.location.search
          }, '/login')
        }

        const mode = urlParams.getQueryString('mode')
        console.log('mode:', mode)
        if (!auth.hasAuth(route.roles) && mode !== 'embed') {
          return replaceState(null, '/403')
        }
      }

      oldOnEnter && oldOnEnter(nextState, replaceState);
    };
  });
};
