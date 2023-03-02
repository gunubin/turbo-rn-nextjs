import {MessageDialogPayload} from '@app/services/modal/MessageDialogPayload';

import reducer, {actions} from '../modalSlice';

describe('@app/modalSlice', () => {
  let dialog: MessageDialogPayload;
  beforeEach(() => {
    dialog = MessageDialogPayload.create({
      labels: ['CANCEL', 'OK'],
      title: 'title',
    });
  });
  test('showed()', () => {
    expect(
      reducer(
        // {entities: {[dialog.id]: dialog}, ids: [dialog.id]},
        {entities: {}, ids: []},
        {
          payload: dialog,
          type: actions.showed.type,
        }
      )
    ).toEqual({entities: {[dialog.id]: dialog}, ids: [dialog.id]});
  });
  test('hid()', () => {
    expect(
      reducer(
        {entities: {[dialog.id]: dialog}, ids: [dialog.id]},
        {
          payload: {id: dialog.id, label: 'ok'},
          type: actions.hid.type,
        }
      )
    ).toEqual({
      entities: {},
      ids: [],
    });
  });
});
