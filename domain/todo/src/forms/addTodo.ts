import {createSchema} from '@app/lib/validations/schema';

import {TodoTitle} from '@todo/domain/todo/TodoTitle';

export type FormValues = {
  title: typeof TodoTitle;
  description?: string;
};

export const addTodoSchema = createSchema<FormValues>({
  description: {
    required: false,
  },
  title: {
    required: {message: ''},
    ruleMessages: {
      maxLength: '100文字以下で入力してください',
    },
    valueObject: TodoTitle,
  },
});
