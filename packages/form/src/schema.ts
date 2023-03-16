import {FieldValues} from 'react-hook-form';

import {ValidationSchema} from './types';

export function createSchema<T extends FieldValues>(
  definitions: ValidationSchema<T>
) {
  return definitions;
}
