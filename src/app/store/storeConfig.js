import {createStore, applyMiddleware,compose} from 'redux';
import {browserHistory} from 'react-router';
import allReducsers  from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux';

export default function storeConfig() {
  const middleware = routerMiddleware(browserHistory)
  return createStore(
    allReducsers,
    compose(
      applyMiddleware(thunk, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};
