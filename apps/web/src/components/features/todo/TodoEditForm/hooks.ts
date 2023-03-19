import {useForm} from 'form';
import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';

import {useIndicator} from '@domain/app/hooks/indicator';
import {useUseCase} from '@domain/app/lib/useCase/useUseCase';
import {updateTodoSchema} from '@domain/todo/forms/updateTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoQuery} from '@domain/todo/services/todo/redux/todoApi';
import {createUpdateTodoUseCase} from '@domain/todo/useCases/todo/updateTodoUseCase';

export const useTodoEditForm = () => {
  const {
    query: {todoId = ''},
    isReady,
  } = useRouter();
  const id = TodoId.create(todoId as string);

  const {data: item} = useGetTodoQuery(id, {skip: !isReady});

  const [updateTodo, {isLoading}] = useUseCase(createUpdateTodoUseCase());

  useIndicator(isLoading, {id: 'useUpdateTodoUseCase'});

  const {fields, isValid, handleSubmit, setValue} = useForm(updateTodoSchema, {
    // defaultValues: {
    //   description: item?.description,
    //   title: item?.title,
    // },
    errorMessages: {
      title: {
        too_big: '100文字以下で入力してください',
        // too_small: '1文字以上で入力してください',
      },
    },
  });

  useEffect(() => {
    if (item) {
      setValue('title', item.title);
      setValue('description', item.description || '');
    }
  }, [setValue, item, item?.title, item?.description]);

  const onPressButton = useMemo(
    () =>
      handleSubmit((values) => {
        const item = Todo.create({
          description: values.description,
          id,
          title: values.title,
        });
        updateTodo({item});
      }),
    [handleSubmit, updateTodo, id]
  );

  return {fields, isValid, onPressButton};
};
