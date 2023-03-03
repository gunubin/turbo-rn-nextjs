import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {ModalId} from '@app/services/modal/ModalId';
import {ModalPayload} from '@app/services/modal/types';
import {AppState} from '@app/services/redux/appReducer';

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
