
import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  useCaseEventTypes,
  UseCaseEventType,
  UseCaseEventCommanded,
  UseCaseEvent,
  UseCaseEventFailed,
  UseCaseEventSucceeded,
} from '@domain/app/lib/useCase/types';
import {AppState} from '@domain/app/services/redux/appReducer';

// commandの実行時系列を把握したいならIDはランダムにしてname prop追加したほうがいい
type UseCaseEntity = {
  id: string;
  status: UseCaseEventType;
};
type CommandedAction = PayloadAction<UseCaseEntity>;
type SucceededAction = PayloadAction<
  UseCaseEntity,
  string,
  {useCaseResult: any}
>;
type FailedAction = PayloadAction<UseCaseEntity, string, never, any>;
export type UseCaseAction = CommandedAction | SucceededAction | FailedAction;

const useCaseAdapter = createEntityAdapter<UseCaseEntity>();
const initialState = useCaseAdapter.getInitialState();
export type UseCaseState = typeof initialState;
const baseSelectors = useCaseAdapter.getSelectors(
  (state: AppState): UseCaseState => state.useCase
);

const isUseCaseProcessing = (useCase: UseCaseEntity) =>
  useCase.status === useCaseEventTypes.commanded;
const selectProcessingById = createSelector(
  baseSelectors.selectById,
  (useCase) => (useCase ? isUseCaseProcessing(useCase) : false)
);

/**
 * create useCaseEntity from UseCaseEvent
 *
 * @param event - UseCaseEvent
 */
const createUseCaseEntity = (event: UseCaseEvent) => {
  const {type, command} = event;
  return {
    id: command.id,
    status: type as UseCaseEventType,
  };
};

const useCaseSlice = createSlice({
  initialState,
  name: 'useCase',
  reducers: {
    commanded: {
      prepare: (event: UseCaseEventCommanded) => {
        const payload = createUseCaseEntity(event);
        return {payload};
      },
      reducer: (state: UseCaseState, action: CommandedAction) => {
        return useCaseAdapter.upsertOne(state, action.payload);
      },
    },
    failed: {
      prepare: (event: UseCaseEventFailed) => {
        const payload = createUseCaseEntity(event);
        return {error: event.error, payload};
      },
      reducer: (state: UseCaseState, action: FailedAction) => {
        return useCaseAdapter.upsertOne(state, action.payload);
      },
    },
    succeeded: {
      prepare: (event: UseCaseEventSucceeded) => {
        const payload = createUseCaseEntity(event);
        return {meta: {useCaseResult: event.result}, payload};
      },
      reducer: (state: UseCaseState, action: SucceededAction) => {
        return useCaseAdapter.upsertOne(state, action.payload);
      },
    },
  },
});

export const {commanded, succeeded, failed} = useCaseSlice.actions;
export const useCaseSelectors = {
  selectProcessingById,
};
export default useCaseSlice.reducer;
