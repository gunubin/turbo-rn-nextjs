import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {ErrorDialogPayload} from '@domain/app/models/modal/ErrorDialogPayload';
import {MessageDialogPayload} from '@domain/app/models/modal/MessageDialogPayload';
import {ModalId} from '@domain/app/models/modal/ModalId';
import {AppState} from '@domain/app/services/redux/appReducer';

// TODO: ErrorDialog
export type ModalPayload = MessageDialogPayload | ErrorDialogPayload;

const modalEntityAdapter = createEntityAdapter<ModalPayload>();

const selectState = (state: AppState) => state.modal;
const baseSelectors = modalEntityAdapter.getSelectors(selectState);
const selectLatestModal = createSelector(
  baseSelectors.selectAll,
  (all) => all[all.length - 1]
);

const modalSlice = createSlice({
  initialState: modalEntityAdapter.getInitialState(),
  name: 'modal',
  reducers: {
    hid: (state, action: PayloadAction<{id: ModalId; label?: string}>) => {
      return modalEntityAdapter.removeOne(state, action.payload.id);
    },
    showed: modalEntityAdapter.upsertOne,
  },
});

export const actions = modalSlice.actions;
export const modalSelectors = {
  selectLatestModal,
};
export default modalSlice.reducer;
