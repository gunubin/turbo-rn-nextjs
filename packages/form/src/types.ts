import {RefCallback} from 'react';
import {FieldValues} from 'react-hook-form';
import {ValueObject, ValueObjectReturnType} from 'utils/domain';
import {z} from 'zod';

import {ErrorMessages} from './useForm';

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

type ValueObjectSchemaProp<TValueObject extends ValueObject> = {
  valueObject: TValueObject;
  errorMessages?: ErrorMessages;
};

type PrimitiveSchemaProp = {
  schema: z.ZodType;
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
