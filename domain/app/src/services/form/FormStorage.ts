import {ReduxProvider} from '@app/services/redux/ReduxProvider';

import {actions, formSelectors} from './redux/formStorageSlice';
import {FormStorageEntity, FormStorageName, IFormStorage} from './types';

export class FormStorage implements IFormStorage {
  private redux: ReduxProvider<any, any>;

  static create() {
    return new FormStorage({redux: ReduxProvider.create()});
  }

  constructor({redux}: {redux: ReduxProvider<any, any>}) {
    this.redux = redux;
  }

  store<TName extends FormStorageName>(
    name: TName,
    entity: Partial<FormStorageEntity<TName>>
  ) {
    this.redux.dispatch(actions.stored({entity, name}));
  }

  reset(name: FormStorageName) {
    this.redux.dispatch(actions.reset({name}));
  }

  get<TName extends FormStorageName>(name: TName) {
    const state = this.redux.getState();
    return formSelectors.selectForm(name)(state);
  }
}
