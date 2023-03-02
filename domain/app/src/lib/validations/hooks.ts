import React from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form';

import {createFormResolver} from '@app/lib/validations/schema';
import {
  Fields,
  FieldValuesBySchema,
  ValidationSchema,
  ValueObjectFieldValues,
} from '@app/lib/validations/types';

export function useForm<
  TSchema extends ValidationSchema<TFieldValues>,
  TFieldValues extends FieldValues = FieldValuesBySchema<TSchema>,
  TValueObjectFieldValues extends FieldValues = ValueObjectFieldValues<TFieldValues>
>(
  schema: TSchema,
  options?: Pick<UseFormProps<TValueObjectFieldValues>, 'defaultValues'>
) {
  // Call react-hook-form
  const {
    setValue,
    watch,
    register,
    formState: {isValid, errors},
    handleSubmit,
  } = useReactHookForm({
    ...options,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: createFormResolver(
      schema as ValidationSchema<any> /*fixme: types*/
    ),
  });

  // Get all values
  const values = watch();

  const fieldProps = React.useMemo(
    () =>
      (Object.keys(schema) as FieldPath<TValueObjectFieldValues>[]).reduce<
        Fields<TValueObjectFieldValues>
      >((acc, name) => {
        const error = {
          ...errors[name],
        } as FieldError;
        const hasError = !!error?.message;

        const reg = register(name as FieldPath<TValueObjectFieldValues>);
        return {
          ...acc,
          [name]: {
            ...(hasError && {error}),
            // hasError,
            ...reg,
          },
        };
      }, {} as Fields<TValueObjectFieldValues>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [register, schema, errors, Object.keys(errors)]
  );
  return {
    errors,
    fields: fieldProps,
    handleSubmit,
    isValid,
    setValue,
    values,
  };
}
