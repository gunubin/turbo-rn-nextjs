import {useForm} from 'form';
import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';

import {useIndicator} from '@domain/app/hooks/indicator';
import {createQuery} from '@domain/app/lib/useCase/utils';
import {addTodoSchema} from '@domain/todo/forms/addTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoQuery} from '@domain/todo/services/todo/redux/todoApi';
import {useUpdateTodoUseCase} from '@domain/todo/useCases/todo/updateTodoUseCase';

export const useTodoEditForm = () => {
  const {
    query: {todoId = ''},
    isReady,
  } = useRouter();
  const id = TodoId.create(todoId as string);

  const {data: item} = createQuery(useGetTodoQuery)(id, {skip: !isReady});

  const [updateTodo, {isLoading}] = useUpdateTodoUseCase();

  useIndicator(isLoading);

  const {fields, isValid, handleSubmit, setValue} = useForm(addTodoSchema, {
    defaultValues: {
      description: item?.description,
      title: item?.title,
    },
  });

  useEffect(() => {
    setValue('title', item?.title);
    setValue('description', item?.description);
  }, [setValue, item]);

  const onPressButton = useMemo(
    () =>
      handleSubmit((values) => {
        const item = Todo.create({
          description: values.description,
          id,
          title: values.title || '',
        });
        updateTodo({item});
      }),
    [handleSubmit, updateTodo, id]
  );

  return {fields, isValid, onPressButton};
};
