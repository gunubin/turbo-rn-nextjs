import {Dispatch} from '@reduxjs/toolkit';

import {MessageDialogPayload} from '@app/services/modal/MessageDialogPayload';
import {ModalId} from '@app/services/modal/ModalId';
import {modalPromiseMiddleware} from '@app/services/modal/redux/modalPromiseMiddleware';

import {actions} from '../modalSlice';

describe('@app/modalPromiseMiddleware', () => {
  const doDispatch: Dispatch = (action) => action;
  const doGetState = () => {};

  const nextHandler = modalPromiseMiddleware({
    dispatch: doDispatch,
    getState: doGetState,
  });

  it('must return a function to handle action', () => {
    const actionHandler = nextHandler((action) => action);
    expect(actionHandler).toBeInstanceOf(Function);
  });
  it('must return a promise to action', () => {
    const actionHandler = nextHandler((action) => action);
    const ret = actionHandler(
      actions.showed(
        MessageDialogPayload.create({labels: ['CANCEL', 'OK'], title: 'title'})
      )
    );
    expect(ret).toBeInstanceOf(Promise);
  });
  it('must resolve a promise to showed by hid action', async () => {
    let dialogId = '';
    const actionHandler = nextHandler((action) => {
      const {
        payload: {id},
      } = action;
      dialogId = id;
      return action;
    });
    const ret = actionHandler(
      actions.showed(
        MessageDialogPayload.create({labels: ['CANCEL', 'OK'], title: 'title'})
      )
    );
    actionHandler(actions.hid({id: dialogId as ModalId, label: 'OK'}));
    await expect(ret).resolves.toEqual('OK');
  });
});
