

import {useForm} from 'form';
import {useMemo} from 'react';

import {useIndicator} from '@app/hooks/indicator';
import {Todo} from '@todo/domain/todo/Todo';
import {addTodoSchema} from '@todo/forms/addTodo';
import {useAddTodoUseCase} from '@todo/useCases/todo/addTodoUseCase';


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
