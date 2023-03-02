import {maxLength} from '@app/lib/domain/rules';
import {defineValueObject} from '@app/lib/domain/utils';

export type TodoTitle = string & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const TodoTitle = defineValueObject({
  create: (val: string) => val as TodoTitle,
  rules: [maxLength(100)],
});
