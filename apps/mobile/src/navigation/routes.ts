import {TodoId} from '@domain/todo/models/todo/TodoId';

import * as routeNames from './routeNames';

export type RootParamList = {
  [routeNames.TOP_PAGE]: undefined;
  [routeNames.DETAIL_PAGE]: {id: TodoId};
};
