import {Ref, RefCallback, RefObject} from 'react';
import {FieldValues} from 'react-hook-form';
import {Rule, ValueObject, ValueObjectReturnType} from 'utils/domain';
import {PartialRecord} from 'utils/types';

export type InputProps<TValue = any> = {
  name: string;
  value: TValue;
  error?: InputError;
  onChange: (val: any) => void;
  onBlur: () => void;
  ref: RefCallback<any>;
};

export type InputError = {
  type: string;
  message: string;
};

export type Fields<T> = {
  [P in keyof T]: InputProps<ValueObjectReturnType<T[P]>>;
};

type ValueObjectRules<T> = T extends ValueObject<any, infer U> ? U : never;
type RuleName<T> = T extends Rule<infer U> ? U : never;

export type RequiredOption = boolean | {message: string};

type ValueObjectSchemaProp<TValueObject extends ValueObject> = {
  valueObject: TValueObject;
  ruleMessages?: Record<
    RuleName<ValueObjectRules<TValueObject>[number]>,
    string
  >;
  required: RequiredOption;
};

type PrimitiveSchemaProp = {
  required: RequiredOption;
};

export type ValidationSchemaProp<TField> = TField extends ValueObject<any, any>
  ? ValueObjectSchemaProp<TField>
  : PrimitiveSchemaProp;

export type ValidationSchema<TFields extends FieldValues> = {
  [key in keyof TFields]: ValidationSchemaProp<TFields[key]>;
};

export type FieldValuesBySchema<T> = T extends ValidationSchema<infer U>
  ? U
  : never;

type FieldValuesByValueObjectReturnValue<FieldValues> = {
  [K in keyof FieldValues]: ValueObjectReturnType<FieldValues[K]>;
};

// SchemaからValuesObjectのFieldsを取得
export type ValueObjectFieldValuesBySchema<T> =
  FieldValuesByValueObjectReturnValue<FieldValuesBySchema<T>>;

// validation messageの上書き用の型
type SchemaValueObjectFieldRulesMessages<TValueObject extends ValueObject> =
  PartialRecord<
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
