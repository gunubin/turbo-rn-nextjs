import {configureStore as rtkConfigureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {modalPromiseMiddleware} from '@app/services/modal/redux/modalPromiseMiddleware';
import {appApi} from '@app/services/redux/appApi';

import rootReducer from '@mobile/services/redux/rootReducer';

const middlewares = [thunk, modalPromiseMiddleware, appApi.middleware];

const store = rtkConfigureStore({
  middleware: middlewares,
  reducer: rootReducer,
});

export const configureStore = () => {
  return store;
};

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

export interface IReduxProvider {
  dispatch: AppDispatch;
  getState: AppGetState;
}
