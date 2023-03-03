import {Rule, ValueObject} from '@app/lib/domain/types';

// MEMO: 命名悩み defineValueObjectCreator的な
export const defineValueObject = <
  TCreate extends (val: any) => any,
  TRules extends Rule<any>[]
>({
  create,
  rules,
}: {
  create: TCreate;
  rules: TRules;
}): ValueObject<ReturnType<TCreate>, TRules> => {
  return {
    create,
    rules,
  };
};
