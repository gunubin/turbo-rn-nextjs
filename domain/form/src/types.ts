import {InputHTMLAttributes} from 'react';
import {FieldValues} from 'react-hook-form';

// TODO: @appからの参照を修正したい
import {PartialRecord} from '@app/@types/utils';
import {Rule, ValueObject} from '@app/lib/domain/types';

export type InputProps = {
  name: string;
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
type RuleName<T> = T extends Rule<infer U> ? U : never;

export type RequiredOption = boolean | {message: string};

type SchemaValueObjectProp<TValueObject extends ValueObject> = {
  valueObject: TValueObject;
  ruleMessages?: Record<
    RuleName<ValueObjectRules<TValueObject>[number]>,
    string
  >;
  required: RequiredOption;
};

type SchemaPrimitiveProp = {
  required: RequiredOption;
};

type ValidationSchemaProp<TField> = TField extends ValueObject<any, any>
  ? SchemaValueObjectProp<TField>
  : SchemaPrimitiveProp;

export type ValidationSchema<TFields extends FieldValues> = {
  [key in keyof TFields]: ValidationSchemaProp<TFields[key]>;
};

// ValueObjectの返り型
export type ValueObjectReturnType<T> = T extends ValueObject<infer U, any> ? U : T;

export type FieldValuesBySchema<T> = T extends ValidationSchema<infer U>
  ? U
  : never;

export type FieldValuesByValueObjectReturnValue<FieldValues> = {
  [K in keyof FieldValues]: ValueObjectReturnType<FieldValues[K]>;
};


// validation messageの上書き用の型

type SchemaValueObjectFieldRulesMessages<TValueObject extends ValueObject> = PartialRecord<
  RuleName<ValueObjectRules<TValueObject>[number]> | 'required',
  string
>;

type SchemaPrimitiveFieldRulesMessages = PartialRecord<'required', string>;

type SchemaFieldRulesMessages<TField> = TField extends ValueObject<any, any>
  ? SchemaValueObjectFieldRulesMessages<TField>
  : SchemaPrimitiveFieldRulesMessages;


export type ValidationSchemaRulesMessages<TFieldValues extends FieldValues> = {
  [K in keyof TFieldValues]?: SchemaFieldRulesMessages<TFieldValues[K]>;
};
