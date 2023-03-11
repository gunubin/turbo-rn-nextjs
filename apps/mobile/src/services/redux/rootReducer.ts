import {combineReducers} from '@domain/app/redux';
import {appApi} from '@domain/app/services/redux/appApi';
import {appReducer} from '@domain/app/services/redux/appReducer';

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  ...appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
