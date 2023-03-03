import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {AppState} from '@app/services/redux/appReducer';
import {ToastStatus} from '@app/services/toast/types';

type ToastState = {
  id: string;
  message: string;
  status?: ToastStatus;
};

const sliceName = 'toast';
const toastEntityAdapter = createEntityAdapter<ToastState>();
const initialState = toastEntityAdapter.getInitialState();

const selectState = (state: AppState) => state.toast;
const baseSelectors = toastEntityAdapter.getSelectors(selectState);

const slice = createSlice({
  initialState,
  name: sliceName,
  reducers: {
    hid: toastEntityAdapter.removeOne,
    showed: toastEntityAdapter.upsertOne,
  },
});

export const actions = slice.actions;
export const toastSelectors = {
  selectById: baseSelectors.selectById,
  selectIds: baseSelectors.selectIds,
};
export default slice.reducer;
