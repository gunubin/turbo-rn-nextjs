import {InputHTMLAttributes} from 'react';
import {FieldValues} from 'react-hook-form';

import {Rule, ValueObject} from '@app/lib/domain/types';

// TODO:
export type InputProps = {
  name: string;
  // hasError: boolean;
  error?: InputError;
  onChange: InputHTMLAttributes<HTMLElement>['onChange'];
  onBlur: () => void;
};

export type InputError = {
  type: string;
  message: string;
};

export type Fields<T> = {
  [P in keyof T]: InputProps;
};

type ValueObjectRules<T> = T extends ValueObject<any, infer U> ? U : never;
type ValueObjectRuleName<T> = T extends Rule<infer U> ? U : never;

export type RequiredOption = boolean | {message: string};

type ValueObjectSchemaProp<TValueObject extends ValueObject> = {
  valueObject: TValueObject;
  ruleMessages?: Record<
    ValueObjectRuleName<ValueObjectRules<TValueObject>[number]>,
    string
  >;
  required: RequiredOption;
};

type PrimitiveSchemaProp = {
  required: RequiredOption;
};

type ValidationSchemaProp<TField> = TField extends ValueObject<any, any>
  ? ValueObjectSchemaProp<TField>
  : PrimitiveSchemaProp;

export type ValidationSchema<TFields extends FieldValues> = {
  [key in keyof TFields]: ValidationSchemaProp<TFields[key]>;
};

// ValueObjectの返り型
export type ValueObjectType<T> = T extends ValueObject<infer U, any> ? U : T;

export type FieldValuesBySchema<T> = T extends ValidationSchema<infer U>
  ? U
  : never;

export type ValueObjectFieldValues<FieldValues> = {
  [K in keyof FieldValues]: ValueObjectType<FieldValues[K]>;
};
