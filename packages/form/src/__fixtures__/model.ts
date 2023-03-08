import {
  defineValueObject,
  emailFormat,
  minLength,
  multipleKindChars,
} from 'utils/domain';

export type Username = string & {readonly brand: unique symbol};
// eslint-disable-next-line no-redeclare
export const Username = defineValueObject({
  create: (val: string) => val as Username,
  rules: [minLength(3)],
});

const REGEX_NUMBER = /[0-9]/;
const REGEX_ALPHABET = /[A-Za-z]/;
const REGEX_SYMBOL = /[!-/:-@{-~[\]^_`]/;
export type Password = string & {readonly brand: unique symbol};
// eslint-disable-next-line no-redeclare
export const Password = defineValueObject({
  create: (val: string) => val as Password,
  rules: [
    multipleKindChars({
      kinds: [REGEX_NUMBER, REGEX_ALPHABET, REGEX_SYMBOL],
      min: 3,
    }),
  ],
});

export type Email = string & {readonly brand: unique symbol};
// eslint-disable-next-line no-redeclare
export const Email = defineValueObject({
  create: (val: string) => val as Email,
  rules: [emailFormat()],
});
