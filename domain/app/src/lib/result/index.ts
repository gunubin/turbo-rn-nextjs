export interface Success<T> {
  readonly ok: true;
  value: T;
}

export interface Failure<T> {
  readonly ok: false;
  error: T;
}

export type Result<T, E> = Success<T> | Failure<E>;

export function success<T>(value: T): Success<T> {
  return {ok: true, value};
}

export function failure<E>(error: E): Failure<E> {
  return {error, ok: false};
}
