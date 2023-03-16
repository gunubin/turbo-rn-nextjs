import {zodResolver} from '@hookform/resolvers/zod';
import React, {useMemo} from 'react';
import {
  FieldError,
  FieldPath,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form';
import {z} from 'zod';

import {getEventValue} from './getEventValue';
import {
  Fields,
  ValidationSchema,
  ValueObjectFieldValuesBySchema,
} from './types';

export type ErrorMessages = {
  [code in z.ZodIssueCode]?: string;
};

type FieldsErrorMessages<TFieldValues> = {
  [field in keyof TFieldValues]?: ErrorMessages;
};

type DefaultValues<TFieldValues> = Partial<TFieldValues>;
type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<DefaultValues<TFieldValues>>;
type Options<
  TSchema,
  TFieldValues = ValueObjectFieldValuesBySchema<TSchema>
> = {
  defaultValues?:
    | DefaultValues<TFieldValues>
    | AsyncDefaultValues<TFieldValues>;
} & {
  errorMessages?: FieldsErrorMessages<ValueObjectFieldValuesBySchema<TSchema>>;
};

export function useForm<TSchema extends ValidationSchema<any>>(
  schema: TSchema,
  options: Options<TSchema> = {}
) {
  const fieldsSchema = useMemo(
    () =>
      Object.entries(schema).reduce<Record<string, z.ZodType>>(
        (acc, [name, field]) => {
          if ('valueObject' in field && field.valueObject.schema) {
            return {...acc, [name]: field.valueObject.schema};
          } else if ('schema' in field) {
            return {...acc, [name]: field.schema};
          } else {
            return acc;
          }
        },
        {}
      ),
    [schema]
  );

  const formSchema = z.object(fieldsSchema);

  const {
    setValue,
    watch,
    register,
    formState: {isValid, errors},
    handleSubmit,
    reset,
    setFocus,
  } = useReactHookForm<ValueObjectFieldValuesBySchema<TSchema>>({
    defaultValues: options.defaultValues as UseFormProps<
      ValueObjectFieldValuesBySchema<TSchema>
    >['defaultValues'],
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  // Get all values
  const values = watch();

  const fieldProps = React.useMemo(
    () =>
      (
        Object.keys(schema) as FieldPath<
          ValueObjectFieldValuesBySchema<TSchema>
        >[]
      ).reduce<Fields<ValueObjectFieldValuesBySchema<TSchema>>>((acc, name) => {
        const field = schema[name];
        const schemaErrorMessages: ErrorMessages | undefined =
          'valueObject' in field ? field.errorMessages : undefined;

        const originalError = errors[name];
        const fieldErrorMessages = options.errorMessages?.[name];
        const errorType = originalError?.type as z.ZodIssueCode;
        const error = {
          ...originalError,
          ...(schemaErrorMessages?.[errorType] !== undefined && {
            message: schemaErrorMessages[errorType],
          }),
          ...(fieldErrorMessages?.[errorType] !== undefined && {
            message: fieldErrorMessages[errorType],
          }),
        } as FieldError;
        const hasError = !!error?.message;

        const fieldControl = register(name);

        const onChange = async (event: string) => {
          const value = getEventValue(event);
          return await fieldControl.onChange({
            target: {name, value},
            type: 'change',
          });
        };
        const onBlur = async () => {
          const v = values[name];
          return await fieldControl.onBlur({
            target: {name, value: v},
            type: 'blur',
          });
        };
        return {
          ...acc,
          [name]: {
            ...fieldControl,
            ...(hasError && {error}),
            onBlur,
            onChange,
            ref: (instance: any) => {
              fieldControl.ref?.(instance);
            },
            value: values[name],
          },
        };
      }, {} as Fields<ValueObjectFieldValuesBySchema<TSchema>>),
    [schema, values, errors, register, options.errorMessages]
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
