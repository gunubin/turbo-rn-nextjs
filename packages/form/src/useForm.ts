import React, {useLayoutEffect, useState} from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  useForm as useReactHookForm,
  UseFormProps,
  UseFormRegisterReturn,
} from 'react-hook-form';

import {getEventValue} from './getEventValue';
import {createFormResolver} from './schema';
import {
  Fields,
  FieldValuesBySchema,
  ValidationSchema,
  ValidationSchemaRulesMessages,
  ValueObjectFieldValuesBySchema,
} from './types';


type Options<TSchema> = Pick<
  UseFormProps<ValueObjectFieldValuesBySchema<TSchema>>,
  'defaultValues'
> & {
  rulesMessages?: ValidationSchemaRulesMessages<FieldValuesBySchema<TSchema>>;
};

export function useForm<
  TSchema extends ValidationSchema<TFieldValues>,
  TFieldValues extends FieldValues = FieldValuesBySchema<TSchema>
>(schema: TSchema, options?: Options<TSchema>) {
  const {defaultValues, rulesMessages} = options || {};
  const resolver = React.useMemo(
    () => createFormResolver(schema as ValidationSchema<any>, rulesMessages),
    [schema, rulesMessages]
  );
  const {
    setValue,
    watch,
    register,
    unregister,
    formState: {isValid, errors},
    handleSubmit,
    reset,
    setFocus,
  } = useReactHookForm<ValueObjectFieldValuesBySchema<TSchema>>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver,
  });

  // Get all values
  const values = watch();

  const [registered, setRegistered] = useState<
    Record<any, UseFormRegisterReturn>
  >({});
  useLayoutEffect(() => {
    Object.keys(schema).forEach((name) => {
      const ret = register(
        name as Path<ValueObjectFieldValuesBySchema<TSchema>>
      );
      if (!(name in registered)) {
        setRegistered({[name]: ret, ...registered});
      }
    });
    return () => {
      Object.keys(schema).forEach((name) => {
        unregister(
          name as Path<ValueObjectFieldValuesBySchema<TSchema>>
        );
      });
    };
  }, [schema, register, unregister, registered]);

  // Register all fields
  const fieldProps = React.useMemo(
    () =>
      (
        Object.keys(schema) as FieldPath<
          ValueObjectFieldValuesBySchema<TSchema>
        >[]
      ).reduce<Fields<ValueObjectFieldValuesBySchema<TSchema>>>((acc, name) => {
        const error = {
          ...errors[name],
        } as FieldError;
        const hasError = !!error?.message;

        const onChange = async (event: string) => {
          const registeredOnChange = registered[name].onChange;
          const value = getEventValue(event)
          return await registeredOnChange({target: {name, value}, type: 'change'})
        };
        const onBlur = async() => {
          const registeredOnBlur = registered[name].onBlur;
          const v = values[name];
          return await registeredOnBlur({target: {name, value: v}, type: 'blur'})
        };
        return {
          ...acc,
          [name]: {
            ...registered[name],
            ...(hasError && {error}),
            onBlur,
            onChange,
            ref: (instance: any) => {
              registered[name]?.ref?.(instance);
            },
            value: values[name],
          },
        };
      }, {} as Fields<ValueObjectFieldValuesBySchema<TSchema>>),
    [schema, values, errors, registered]
  );
  return {
    errors,
    fields: fieldProps,
    handleSubmit,
    isValid,
    reset,
    setFocus,
    setValue,
    values,
  };
}
