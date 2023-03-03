import {ReducersReturnType} from '@app/lib/redux/types';
import useCaseReducer from '@app/lib/useCase/redux/useCaseSlice';
import formStorageReducer from '@app/services/form/redux/formStorageSlice';
import indicatorReducer from '@app/services/modal/redux/indicatorSlice';
import modalReducer from '@app/services/modal/redux/modalSlice';
import toastReducer from '@app/services/toast/redux/toastSlice';

export const appReducer = {
  formStorage: formStorageReducer,
  indicator: indicatorReducer,
  modal: modalReducer,
  toast: toastReducer,
  useCase: useCaseReducer,
};

export type AppState = ReducersReturnType<typeof appReducer>;
