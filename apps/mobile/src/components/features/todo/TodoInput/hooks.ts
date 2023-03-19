import {useForm} from 'form';
import {useMemo} from 'react';

import {useUseCase} from '@domain/app/lib/useCase/useUseCase';
import {addTodoSchema} from '@domain/todo/forms/addTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {createAddTodoUseCase} from '@domain/todo/useCases/todo/addTodoUseCase';

import {useIndicator} from '@/hooks/indicator';

export const useTodoInput = () => {
  const [addTodo, {isLoading}] = useUseCase(createAddTodoUseCase());

  useIndicator(isLoading);
  const {fields, handleSubmit} = useForm(addTodoSchema);

  const onPressButton = useMemo(
    () =>
      handleSubmit(async values => {
        const item = Todo.create({
          title: values.title,
        });
        await addTodo({item});
      }),
    [handleSubmit, addTodo],
  );

  return {fields, onPressButton};
};
