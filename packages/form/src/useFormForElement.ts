import React from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues, Path,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form';

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

export function useFormForElement<
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
    formState: {isValid, errors},
    handleSubmit,
  } = useReactHookForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver,
  });

  const values = watch();
  const fieldProps = React.useMemo(
    () =>
      (Object.keys(schema) as FieldPath<TFieldValues>[]).reduce<
        Fields<TFieldValues>
      >((acc, name) => {
        const error = {...errors[name]} as FieldError;
        const hasError = !!error?.message;

        const reg = register(name as Path<TFieldValues>);
        return {
          ...acc,
          [name]: {
            ...(hasError && {error}),
            ...reg,
          },
        };
      }, {} as Fields<TFieldValues>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [register, schema, Object.keys(errors)]
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
