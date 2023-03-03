import {createValidatorFactory} from './validator';

export const required = createValidatorFactory<void>({
  message: '必須項目です',
  type: 'required',
  validate(value) {
    return !!value || value === false;
  },
});
