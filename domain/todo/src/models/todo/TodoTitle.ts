import {defineValueObject, maxLength} from 'utils/domain';

export type TodoTitle = string & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const TodoTitle = defineValueObject({
  create: (val: string) => val as TodoTitle,
  rules: [maxLength(100)],
});
