import {Rule, ValueObject} from 'utils/domain';

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
      (message?: ValidationMessage<TParams>): Validator<TParams>;
    }
  : {
      (options: {
        params: TParams;
        message?: ValidationMessage<TParams>;
      }): Validator<TParams>;
    };

export type Validator<TParams = any, TFields = any> = {
  type: string;
  validate(value: any, values?: TFields): boolean;
  message: ValidationMessage<TParams>;
  params: TParams;
};

// Invoke validation
export function validate(
  validator: Validator,
  value: any,
  values: any
): ValidationResult {
  return {
    isValid: validator.validate(value, values),
    message: (() => {
      if (typeof validator.message === 'string') {
        return validator.message;
      }
      return validator.message?.(validator.params);
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return validate(value, values, params!);
      },
    };
  }) as ValidatorFactory<TParams>;
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
