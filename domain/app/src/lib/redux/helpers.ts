import {PayloadAction} from '@reduxjs/toolkit';

export const isQueryError = (action: PayloadAction<Error>) => {
  return action.type.includes('executeQuery');
};

export const isMutationError = (action: PayloadAction<Error>) => {
  return action.type.includes('executeMutation');
};
