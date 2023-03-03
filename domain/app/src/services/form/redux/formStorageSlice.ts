import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppState} from '@app/services/redux/appReducer';

import {
  FormStorageEntities,
  FormStorageEntity,
  FormStorageName,
} from '../types';

type FormState = FormStorageEntities;

const initialState: FormState = {};

const selectState = (state: AppState): FormState => state.formStorage;
const selectForm = <TFormName extends FormStorageName>(formName: TFormName) =>
  createSelector(selectState, (state) => {
    return state[formName];
  });

const formStorageSlice = createSlice({
  initialState,
  name: 'form',
  reducers: {
    reset: (state, action: PayloadAction<{name: FormStorageName}>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[action.payload.name]: _, ...form} = state;
      return form;
    },
    stored: (
      state,
      action: PayloadAction<{
        name: FormStorageName;
        entity: Partial<FormStorageEntity<FormStorageName>>;
      }>
    ) => {
      const {[action.payload.name]: currentForm} = state;
      return {
        ...state,
        [action.payload.name]: {
          ...currentForm,
          ...action.payload.entity,
        } as FormStorageEntity<FormStorageName>,
      };
    },
  },
});

export const formSelectors = {
  selectForm,
};
export const actions = formStorageSlice.actions;
export default formStorageSlice.reducer;
