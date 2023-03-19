import {createSchema} from 'form';

import {TodoTitle} from '@domain/todo/models/todo/TodoTitle';

export type FormValues = {
  title: typeof TodoTitle;
};

export const addTodoSchema = createSchema<FormValues>({
  title: {
    errorMessages: {
      too_big: '100文字以下で入力してください',
      too_small: '',
    },
    valueObject: TodoTitle,
  },
});

