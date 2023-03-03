import {combineReducers} from '@reduxjs/toolkit';

import {appApi} from '@app/services/redux/appApi';
import {appReducer} from '@app/services/redux/appReducer';

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  ...appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
