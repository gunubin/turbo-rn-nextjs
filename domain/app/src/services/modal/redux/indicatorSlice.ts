import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import {BlockingIndicatorPayload} from '@domain/app/model/modal/BlockingIndicatorPayload';
import {AppState} from '@domain/app/services/redux/appReducer';

const indicatorEntityAdapter = createEntityAdapter<BlockingIndicatorPayload>();

const selectState = (state: AppState) => state.indicator;
const baseSelectors = indicatorEntityAdapter.getSelectors(selectState);
const selectLatestIndicator = createSelector(baseSelectors.selectAll, (all) => {
  return all[all.length - 1] as any;
});

const indicatorSlice = createSlice({
  initialState: indicatorEntityAdapter.getInitialState(),
  name: 'indicator',
  reducers: {
    cleared: indicatorEntityAdapter.removeAll,
    hid: indicatorEntityAdapter.removeOne,
    showed: indicatorEntityAdapter.upsertOne,
  },
});

export const actions = indicatorSlice.actions;
export const indicatorSelectors = {
  selectById: indicatorEntityAdapter.getSelectors().selectById,
  selectLatestIndicator,
};
export default indicatorSlice.reducer;
