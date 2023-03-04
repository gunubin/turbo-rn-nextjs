import {combineReducers, createStore} from '@reduxjs/toolkit';

import useCaseReducer from '@domain/app/lib/useCase/redux/useCaseSlice';
import formStorageReducer from '@domain/app/services/form/redux/formStorageSlice';
import indicatorReducer from '@domain/app/services/modal/redux/indicatorSlice';
import modalReducer from '@domain/app/services/modal/redux/modalSlice';
import {appApi} from '@domain/app/services/redux/appApi';
import toastReducer from '@domain/app/services/toast/redux/toastSlice';

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  formStorage: formStorageReducer,
  indicator: indicatorReducer,
  modal: modalReducer,
  toast: toastReducer,
  useCase: useCaseReducer,
});

export function createMockStore() {
  const store = createStore(rootReducer);
  return store;
}
