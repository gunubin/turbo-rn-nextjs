import * as z from 'zod';

import {ValueObject} from './types';

export const createValueObject = <T extends z.ZodType>(schema: T): ValueObject<z.infer<T>, z.input<T>> => {
  return {
    create: (data: z.input<T>): z.infer<T> => {
      return schema.parse(data);
    },
    schema,
  };
};
