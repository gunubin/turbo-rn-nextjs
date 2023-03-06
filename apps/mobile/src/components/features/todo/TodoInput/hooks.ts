import {useForm} from 'form';
import {useMemo} from 'react';

import {addTodoSchema} from '@domain/todo/forms/addTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {useAddTodoUseCase} from '@domain/todo/useCases/todo/addTodoUseCase';

import {useIndicator} from '@/hooks/indicator';

export const useTodoInput = () => {
  const [addTodo, {isLoading}] = useAddTodoUseCase();
  useIndicator(isLoading);
  const {fields, handleSubmit} = useForm(addTodoSchema, {
    defaultValues: {
      title: '',
    },
  });

  const onPressButton = useMemo(
    () =>
      handleSubmit(values => {
        const item = Todo.create({
          title: values.title,
        });
        addTodo({item});
      }),
    [handleSubmit, addTodo],
  );

  return {fields, onPressButton};
};
