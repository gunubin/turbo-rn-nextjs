import {validateFieldsNatively} from '@hookform/resolvers';
import {FieldValues, Resolver} from 'react-hook-form';

import {required} from './rules';
import {
  FieldValuesBySchema,
  RequiredOption,
  ValidationSchema,
  ValidationSchemaProp,
  ValidationSchemaRulesMessages,
  ValueObjectFieldValuesBySchema,
} from './types';
import {createValidatorFromValueObject, validate, Validator} from './validator';

export function hasMessageRequiredOption(
  value: RequiredOption
): value is { message: string } {
  return typeof value === 'object';
}

const getRules = <TFieldValue extends ValidationSchemaProp<any>>(name: string, field: TFieldValue, fieldsErrors?: ValidationSchemaRulesMessages<any>) => {
  let rules: Validator[] = [];
  if (field.required) {
    if (fieldsErrors?.[name]) {
      rules.push(required(fieldsErrors[name]?.required));
    } else {
      const message = hasMessageRequiredOption(field.required) ? field.required.message : '';
      rules.push(required(message));
    }
  }
  if ('valueObject' in field) {
    rules = [
      ...rules,
      ...createValidatorFromValueObject({
        messages: (fieldsErrors?.[name] || field.ruleMessages || {}) as Record<string, string>,
        valueObject: field.valueObject,
      }),
    ];
  }
  return rules;
}


export function createFormResolver<TSchema extends ValidationSchema<any>>(
  schema: TSchema,
  fieldsErrors?: ValidationSchemaRulesMessages<FieldValuesBySchema<TSchema>>
): Resolver<ValueObjectFieldValuesBySchema<TSchema>> {
  return async (values, _context, options) => {
    const errors = Object.entries(values).reduce((acc, [name, value]) => {
      const rules = getRules(name, schema[name], fieldsErrors)
      const results = rules
        .map((rule) => validate(rule, value, values))
        .filter((v) => !v.isValid);
      const [{message = '', type = ''} = {}] = results;
      return {
        ...acc,
        ...(results.length > 0 && {
          [name]: {
            message,
            type,
          },
        }),
      };
    }, {})

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      return {
        errors,
        values: {},
      }
    }

    const valueObjects = Object.keys(values).reduce<FieldValuesBySchema<TSchema>>(
      (acc, key) => {
        const field = schema[key] || {};
        const value = values[key];
        return {...acc, [key]: 'valueObject' in field ? field.valueObject.create(value) : value};
      },
      {} as FieldValuesBySchema<TSchema>
    );

    options.shouldUseNativeValidation && validateFieldsNatively({}, options);

    return {
      errors: {},
      values: valueObjects,
    };
  };
}

export function createSchema<T extends FieldValues>(
  definitions: ValidationSchema<T>
) {
  return definitions;
}
