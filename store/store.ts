// redux
import { createWrapper, Context } from 'next-redux-wrapper';
import { createStore, applyMiddleware, Store, compose, combineReducers } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { watchAuth, watchDashboard } from './sagas/index';
import { composeWithDevTools } from 'redux-devtools-extension';

// redux-persist
// import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// reducers
import authReducer from './reducers/auth';
import dashboardReducer from './reducers/dashboard';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

// enable browser redux extension tool
// const composeEnhancers =
//   process.env.NODE_ENV === 'development'
//     ? typeof window !== 'undefined' && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

// you want to store only a subset of your state of reducer one
const saveAuthSubsetFilter = createFilter('auth', ['tokens']);

// combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// 1: Create the middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

// 2: Add an extra parameter for applying middleware:
const makeConfiguredStore = (reducer: any) => createStore(reducer, undefined, composeEnhancer);

// we need it only on client side
const { persistStore, persistReducer } = require('redux-persist');
// redux persist config
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'], // which reducer want to store - name of reducer
  transforms: [saveAuthSubsetFilter],
  stateReconciler: autoMergeLevel2,
};
// set config to our rootreducer
const pReducer = persistReducer(persistConfig, rootReducer);
const store = makeConfiguredStore(pReducer);
(store as any).__persistor = persistStore(store);

export const persistor = (store as any).__persistor; //moved code out in order to export persistor to purge data when logout
// 3: Run your sagas on server
(store as SagaStore).sagaTask = sagaMiddleware.run(watchAuth);
(store as SagaStore).sagaTask = sagaMiddleware.run(watchDashboard);

export const makeStore = (_context: Context) => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    return store;
  }
};

export const wrapper = createWrapper<any>(makeStore, { debug: true });
