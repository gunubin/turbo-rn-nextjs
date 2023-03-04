import {ReduxProvider} from '@domain/app/services/redux/ReduxProvider';
import {actions} from '@domain/app/services/toast/redux/toastSlice';
import {IToastManager} from '@domain/app/services/toast/types';

let toastIndex = 0;

const createId = () => {
  toastIndex++;
  return toastIndex.toString();
};

export const createToastManger = (): IToastManager => {
  const redux = ReduxProvider.create();
  return {
    hide: (id) => {
      redux.dispatch(actions.hid(id));
    },
    show: (params) => {
      redux.dispatch(actions.showed({...params, id: createId()}));
    },
  };
};
