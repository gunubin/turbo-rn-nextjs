import {FieldErrors, FieldValues, Resolver} from 'react-hook-form';

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
    if (fieldsErrors && fieldsErrors[name]) {
      rules.push(required(fieldsErrors[name]?.required));
    } else {
      hasMessageRequiredOption(field.required)
        ? rules.push(required(field.required.message))
        : rules.push(required());
    }
  }
  if ('valueObject' in field) {
    rules = [
      ...rules,
      ...createValidatorFromValueObject({
        messages: ((fieldsErrors && fieldsErrors[name]) ||
          field.ruleMessages ||
          {}) as any,
        valueObject: field.valueObject,
      }),
    ];
  }
  return rules;
}


export function createFormResolver<
  TSchema extends ValidationSchema<TFields>,
  TFields extends FieldValues = FieldValuesBySchema<TSchema>,
>(
  schema: TSchema,
  fieldsErrors?: ValidationSchemaRulesMessages<TFields>
): Resolver<ValueObjectFieldValuesBySchema<TSchema>> {
  return async (values, _context, {fields, names}) => {
    let errors: FieldErrors<TFields> = {};
    // TODO: namesで分岐する必要ない説
    // 一応編集時に編集項目だけバリデーションする動きなので無駄がない
    if (names) {
      // Validate only changed fields
      errors = names.reduce<FieldErrors<TFields>>((acc, name) => {
        const rules = getRules(name, schema[name], fieldsErrors)
        const value = values[name];
        const results = rules
          .map((rule) => validate(rule, value, values))
          .filter((v) => !v.isValid);
        const [{message = ''} = {}] = results;
        return {
          ...acc,
          ...(results.length > 0 && {
            [name]: {
              message,
              type: 'validate',
            },
          }),
        };
      }, {})
    } else {
      // Validate all fields on submit event
      errors = Object.entries(values).reduce((acc, [name, value]) => {
        const rules = getRules(name, schema[name], fieldsErrors)
        const results = rules
          .map((rule) => validate(rule, value, values))
          .filter((v) => !v.isValid);
        const [{message = ''} = {}] = results;
        return {
          ...acc,
          ...(results.length > 0 && {
            [name]: {
              message,
              type: 'validate',
            },
          }),
        };
      }, {})
    }

    // FIXME: validな値しかValueObject.createできないはず
    const valueObjectValues = Object.keys(fields).reduce<TFields>(
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
