import {FieldErrors, FieldValues, Resolver} from 'react-hook-form';


import {required} from './rules';
import {
  FieldValuesBySchema,
  RequiredOption,
  ValidationSchema,
  FieldValuesByValueObjectReturnValue, ValidationSchemaRulesMessages,
} from './types';
import {
  createValidatorFromValueObject,
  validate,
  Validator,
} from './validator';

export function hasMessageRequiredOption(
  value: RequiredOption
): value is {message: string} {
  return typeof value === 'object';
}

export function createFormResolver<
  TSchema extends ValidationSchema<TFields>,
  TFields extends FieldValues = FieldValuesBySchema<TSchema>,
  TValueObjectFieldValues extends FieldValues = FieldValuesByValueObjectReturnValue<TFields>
>(schema: TSchema, fieldsErrors?: ValidationSchemaRulesMessages<TFields>): Resolver<TValueObjectFieldValues> {
  return async (values) => {
    const errors = Object.keys(schema).reduce<FieldErrors<TFields>>(
      (acc, key) => {
        let itemRules: Validator[] = [];
        const field = schema[key] || {};
        if (field.required) {
          if (fieldsErrors && fieldsErrors[key]) {
              itemRules.push(required(fieldsErrors[key]?.required))
          } else {
            hasMessageRequiredOption(field.required)
              ? itemRules.push(required(field.required.message))
              : itemRules.push(required());
          }
        }
        if ('valueObject' in field) {
          itemRules = [
            ...itemRules,
            ...createValidatorFromValueObject({
              messages: ((fieldsErrors && fieldsErrors[key]) || field.ruleMessages || {}) as any,
              valueObject: field.valueObject,
            }),
          ];
        }
        const value = values[key];
        const results = itemRules
          .map((rule) => validate(rule, value, values))
          .filter((v) => !v.isValid);
        const [{message = ''} = {}] = results;
        return {
          ...acc,
          ...(results.length > 0 && {
            [key]: {
              message,
              type: 'validate',
            },
          }),
        };
      },
      {} as FieldErrors<TFields>
    );

    const valueObjectValues = Object.keys(schema).reduce<TFields>(
      (acc, key) => {
        const field = schema[key] || {};
        const value = values[key];
        if ('valueObject' in field) {
          return {...acc, [key]: field.valueObject.create(value)};
        } else {
          return {...acc, [key]: value};
        }
      },
      {} as TFields
    );

    const hasErrors = Object.keys(errors).length > 0;
    return {
      errors: hasErrors ? errors : {},
      values: valueObjectValues,
    };
  };
}

export function createSchema<T extends FieldValues>(
  definitions: ValidationSchema<T>
) {
  return definitions;
}
