import {createSchema} from 'form';

import {TodoTitle} from '@domain/todo/models/todo/TodoTitle';

export type FormValues = {
  title: typeof TodoTitle;
  description?: string;
};

export const addTodoSchema = createSchema<FormValues>({
  description: {
    required: false,
  },
  title: {
    required: true,
    ruleMessages: {
      maxLength: '100文字以下で入力してください',
    },
    valueObject: TodoTitle,
  },
});
