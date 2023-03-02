export type Validate = (value: any) => boolean;

export type Rule<TName extends string> = {
  name: TName;
  validate: Validate;
};
export type RuleCreator<TName extends string> = (
  ruleValue?: any
) => Rule<TName>;

export type ValueObject<T = any, K extends Rule<string>[] = []> = {
  create(value: any): T;
  rules: K;
};
