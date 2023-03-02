import {Rule, ValueObject} from '@app/lib/domain/types';

type ValidationMessage<TParams> = TParams extends void
  ? string
  : string | ((params: TParams) => string);

type ValidationResult = {
  type?: string;
  isValid: boolean;
  message: string;
};

type ValidatorOptions<TParams, TFields = any> = {
  type: string;
  message: ValidationMessage<TParams>;
  validate: (value: any, values: TFields, params: TParams) => boolean;
};

type ValidatorFactoryOptions<TParams> =
  | {
      params: TParams;
      message: ValidationMessage<TParams>;
    }
  | ValidationMessage<TParams>;

export type ValidatorFactory<TParams = any> = TParams extends void
  ? {
      (message?: ValidationMessage<TParams>): ValidatorObject<TParams>;
    }
  : {
      (options: {
        params: TParams;
        message?: ValidationMessage<TParams>;
      }): ValidatorObject<TParams>;
    };

export type Validator<TParams = any, TFields = any> =
  | ValidatorFunction<TFields>
  | ValidatorObject<TParams, TFields>;

type ValidatorFunction<TFields = any> = (
  value: any,
  values: TFields
) => ValidationResult;
type ValidatorObject<TParams = any, TFields = any> = TParams extends void
  ? {
      type: string;
      message: ValidationMessage<TParams>;
      validate(value: any, values?: TFields): boolean;
      params?: TParams;
    }
  : {
      type: string;
      validate(value: any, values?: TFields): boolean;
      message: ValidationMessage<TParams>;
      params: TParams;
    };

// Invoke validation
export function validate(
  validator: Validator | ValidatorFunction,
  value: any,
  values: any
): ValidationResult {
  if (typeof validator === 'function') {
    const result = validator(value, values);
    return {
      isValid: result.isValid,
      message: result.message,
    };
  }
  return {
    isValid: validator.validate(value, values),
    message: (() => {
      if (typeof validator.message === 'string') {
        return validator.message;
      }
      return validator.message(validator.params);
    })(),
    type: validator.type,
  };
}

// Create ValidatorFactory
export const createValidatorFactory = <TParams, TFields = any>({
  validate,
  message: defaultValidationMessage,
  type,
}: ValidatorOptions<TParams, TFields>): ValidatorFactory<TParams> => {
  return ((options: ValidatorFactoryOptions<TParams>) => {
    let message: ValidationMessage<TParams>, params: TParams | undefined;
    if (typeof options === 'object') {
      params = options.params;
      message = options.message;
    } else {
      params = undefined;
      message = options;
    }
    return {
      message: message ?? defaultValidationMessage,
      params,
      type,
      validate(value: any, values: TFields) {
        return validate(value, values, params!);
      },
    };
  }) as unknown as ValidatorFactory<TParams>;
};

export const createValidatorFromValueObject = <
  TValueObject extends ValueObject<any, Rule<any>[]>
>({
  valueObject,
  messages,
}: {
  valueObject: TValueObject;
  messages: Record<string, string>;
}) => {
  return (
    valueObject.rules.map((rule) => {
      return createValidatorFactory<void>({
        message: messages[rule.name],
        type: rule.name,
        validate: rule.validate,
      })();
    }) || []
  );
};
