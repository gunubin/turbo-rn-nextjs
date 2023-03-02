import {Dispatch} from '@reduxjs/toolkit';

type Context<S, D extends Dispatch> = {
  getState: () => S;
  dispatch: D;
};

/**
 *  Redux bahavior provider in this app
 */
export class ReduxProvider<S, D extends Dispatch> {
  private static singleton: ReduxProvider<any, any> | null = null;
  private _context: Context<S, D> | null;

  static create<S = any, D extends Dispatch = Dispatch>(): ReduxProvider<S, D> {
    if (!ReduxProvider.singleton) {
      ReduxProvider.singleton = new ReduxProvider<S, D>();
    }
    return ReduxProvider.singleton;
  }

  constructor() {
    this._context = null;
  }

  setContext(context: Context<S, D>) {
    this._context = context;
  }

  private getContext() {
    if (!this._context) {
      throw Error('Redux context does not exists');
    }
    return this._context;
  }

  getState() {
    return this.getContext().getState();
  }

  // FIXME: replace any type
  dispatch(action: any) {
    return this.getContext().dispatch(action);
  }
}
