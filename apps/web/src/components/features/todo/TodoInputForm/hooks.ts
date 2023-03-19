import {useForm} from 'form';
import {useMemo} from 'react';

import {useIndicator} from '@domain/app/hooks/indicator';
import {useUseCase} from '@domain/app/lib/useCase/useUseCase';
import {addTodoSchema} from '@domain/todo/forms/addTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {createAddTodoUseCase} from '@domain/todo/useCases/todo/addTodoUseCase';

export const useTodoInputForm = () => {
  const [addTodo, {isLoading}] = useUseCase(createAddTodoUseCase());

  useIndicator(isLoading, {id: 'createAddTodoUseCase'});

  const {fields, isValid, handleSubmit} = useForm(addTodoSchema);

  const onPressButton = useMemo(
    () =>
      handleSubmit(async (values) => {
        const item = Todo.create({
          title: values.title,
        });
        await addTodo({item});
      }),
    [handleSubmit, addTodo]
  );

  return {fields, isValid, onPressButton};
};
