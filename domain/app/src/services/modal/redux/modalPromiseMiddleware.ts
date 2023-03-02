import {AnyAction, Middleware} from '@reduxjs/toolkit';

import {actions} from '@app/services/modal/redux/modalSlice';

type Resolver = (result: string) => void;
type DialogPromiseDispatch = (action: AnyAction) => Promise<any>;

export const modalPromiseMiddleware: Middleware<DialogPromiseDispatch> = () => {
  const dialogPromiseResolvers: Record<string, Resolver> = {};

  return (next) => (action: AnyAction) => {
    switch (action.type) {
      case actions.showed.type: {
        next(action);
        let promiseResolve: Resolver;
        const dialogPromise = new Promise((resolve: Resolver) => {
          promiseResolve = resolve;
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        dialogPromiseResolvers[action.payload.id] = promiseResolve!;
        return dialogPromise;
      }
      case actions.hid.type: {
        next(action);
        const {id, label} = action.payload;
        const resolver = dialogPromiseResolvers[id];
        resolver && resolver(label);
        delete dialogPromiseResolvers[id];
        break;
      }
      default:
        return next(action);
    }
  };
};
