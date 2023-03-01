import {combineReducers} from '@reduxjs/toolkit';

import useCaseReducer from '@app/lib/useCase/redux/useCaseSlice';
import formStorageReducer from '@app/services/form/redux/formStorageSlice';
import indicatorReducer from '@app/services/modal/redux/indicatorSlice';
import modalReducer from '@app/services/modal/redux/modalSlice';
import {appApi} from '@app/services/redux/appApi';
import toastReducer from '@app/services/toast/redux/toastSlice';

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  formStorage: formStorageReducer,
  indicator: indicatorReducer,
  modal: modalReducer,
  toast: toastReducer,
  useCase: useCaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
