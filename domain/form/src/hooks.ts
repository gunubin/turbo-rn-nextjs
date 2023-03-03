import React from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form';

import {createFormResolver} from './schema';
import {
  Fields,
  FieldValuesBySchema,
  FieldValuesByValueObjectReturnValue,
  ValidationSchema,
  ValidationSchemaRulesMessages,
} from './types';


type Options<TFieldValues extends FieldValues> = Pick<
  UseFormProps<FieldValuesByValueObjectReturnValue<TFieldValues>>,
  'defaultValues'
> & {
  rulesMessages?: ValidationSchemaRulesMessages<TFieldValues>;
};

export function useForm<
  TSchema extends ValidationSchema<TFieldValues>,
  TFieldValues extends FieldValues = FieldValuesBySchema<TSchema>
>(
  schema: TSchema,
  options?: Options<
    FieldValuesBySchema<TSchema> /* MEMO: TFieldValuesでextendsが解決できない */
  >
) {
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

        const reg = register(name as any);
        return {
          ...acc,
          [name]: {
            ...(hasError && {error}),
            // hasError,
            ...reg,
          },
        };
      }, {} as Fields<TFieldValues>),
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
