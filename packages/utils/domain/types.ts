import * as z from 'zod';

export interface ValueObject<T = any, U = any> {
  schema: z.ZodType<T>;
  create: (data: U) => T;
}

// ValueObjectの返り型
export type ValueObjectReturnType<T> = T extends ValueObject<infer U, any>
  ? U
  : T;
