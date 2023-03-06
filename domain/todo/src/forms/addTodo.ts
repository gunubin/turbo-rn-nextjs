import {createSchema} from 'form';

import {TodoTitle} from '@domain/todo/models/todo/TodoTitle';

export type FormValues = {
  title: typeof TodoTitle;
};

export const addTodoSchema = createSchema<FormValues>({
  title: {
    required: {message: ''},
    ruleMessages: {
      maxLength: '100文字以下で入力してください',
    },
    valueObject: TodoTitle,
  },
});
