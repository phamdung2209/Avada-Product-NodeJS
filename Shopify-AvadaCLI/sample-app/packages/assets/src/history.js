import {createBrowserHistory} from 'history';
import {routePrefix} from '@assets/config/app';

function createBrowserHistoryWithBasename() {
  const basename = routePrefix;
  const history = createBrowserHistory();
  history.basename = basename;

  const push = history.push;
  const replace = history.replace;
  history.push = (to, state = undefined) => {
    if (typeof to === 'undefined') {
      console.log('No URL found');
      return;
    }
    if (to.length === 0) {
      return;
    }
    if (to.pathname) {
      to = to.pathname.replace(basename, '');
      return appendBaseName(basename, to, state, push);
    }
    to = to.replace(basename, '');
    appendBaseName(basename, to, state, push);
  };
  history.replace = (to, state = undefined) => {
    if (typeof to === 'undefined') {
      console.log('No URL found');
      return;
    }
    to = to.replace(basename, '');
    appendBaseName(basename, to, state, replace);
  };

  return history;
}

function appendBaseName(basename, to, state, callback) {
  if (to.startsWith('/auth/shopify')) {
    return callback('/embed', state);
  }
  if (typeof to === 'string') {
    to = basename + to;
  }
  if (typeof to === 'object' && to.pathname) {
    to.pathname = basename + to.pathname;
  }
  if (state !== undefined && state.pathname) {
    to.pathname = basename + state.pathname;
  }

  return callback(to, state);
}

export const history = createBrowserHistoryWithBasename();
