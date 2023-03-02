export type ErrorDisplayType = 'toast' | 'dialog';

export type BaseError<TType = string, TError extends Error = Error> = {
  original: TError;
  type: TType;
};
