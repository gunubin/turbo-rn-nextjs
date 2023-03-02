import {ReduxProvider} from '@app/services/redux/ReduxProvider';
import {actions} from '@app/services/toast/redux/toastSlice';
import {IToastManager} from '@app/services/toast/types';

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
