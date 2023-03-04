import {ReducersReturnType} from '@domain/app/lib/redux/types';
import useCaseReducer from '@domain/app/lib/useCase/redux/useCaseSlice';
import formStorageReducer from '@domain/app/services/form/redux/formStorageSlice';
import indicatorReducer from '@domain/app/services/modal/redux/indicatorSlice';
import modalReducer from '@domain/app/services/modal/redux/modalSlice';
import toastReducer from '@domain/app/services/toast/redux/toastSlice';

export const appReducer = {
  formStorage: formStorageReducer,
  indicator: indicatorReducer,
  modal: modalReducer,
  toast: toastReducer,
  useCase: useCaseReducer,
};

export type AppState = ReducersReturnType<typeof appReducer>;
