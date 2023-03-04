import {useForm} from 'form';
import {useMemo} from 'react';

import {useIndicator} from '@domain/app/hooks/indicator';
import {addTodoSchema} from '@domain/todo/forms/addTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {useAddTodoUseCase} from '@domain/todo/useCases/todo/addTodoUseCase';

export const useTodoInputForm = () => {
  const [addTodo, {isLoading}] = useAddTodoUseCase();

  useIndicator(isLoading);

  const {fields, isValid, handleSubmit} = useForm(addTodoSchema, {
    defaultValues: {
      description: '',
      title: '',
    },
  });

  const onPressButton = useMemo(
    () =>
      handleSubmit((values) => {
        const item = Todo.create({
          description: values.description,
          title: values.title,
        });
        addTodo({item});
      }),
    [handleSubmit, addTodo]
  );

  return {fields, isValid, onPressButton};
};
