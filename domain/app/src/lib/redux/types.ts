import {Reducer} from '@reduxjs/toolkit';

export type ReducersReturnType<T extends Record<string, Reducer>> = {
  [K in keyof T]: ReturnType<T[K]>;
};
