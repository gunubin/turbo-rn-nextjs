import {createSchema} from 'form';
import {z} from 'utils/validation';

import {TodoTitle} from '@domain/todo/models/todo/TodoTitle';

export type FormValues = {
  title: typeof TodoTitle;
  description: string;
};

export const updateTodoSchema = createSchema<FormValues>({
  description: {
    schema: z.string(),
  },
  title: {
    errorMessages: {
      too_big: '100文字以下で入力してください',
      too_small: '1文字以上で入力してください',
    },
    valueObject: TodoTitle,
  },
});
