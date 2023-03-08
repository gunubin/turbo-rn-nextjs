export type Brand<T, U extends symbol> = T & {readonly __brand: U};

export type Validate = (value: any) => boolean;

export type Rule<TName extends string> = {
  name: TName;
  validate: Validate;
};
export type RuleCreator<TName extends string, TParams = void> = (
  ruleValue: TParams
) => Rule<TName>;

// ValueObjectの返り型
export type ValueObjectReturnType<T> = T extends ValueObject<infer U, any>
  ? U
  : T;

export type ValueObject<T = any, K extends Rule<string>[] = []> = {
  create(value: any): T;
  rules: K;
};
