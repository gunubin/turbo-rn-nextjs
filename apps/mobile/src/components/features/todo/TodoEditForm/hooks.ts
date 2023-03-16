import {RouteProp, useRoute} from '@react-navigation/native';
import {useForm} from 'form';
import {useMemo} from 'react';

import {updateTodoSchema} from '@domain/todo/forms/updateTodo';
import {Todo} from '@domain/todo/models/todo/Todo';
import {useLazyGetTodoQuery} from '@domain/todo/services/todo/redux/todoApi';
import {useUpdateTodoUseCase} from '@domain/todo/useCases/todo/updateTodoUseCase';

import {useIndicator} from '@/hooks/indicator';
import {RootParamList} from '@/navigation/routes';

export const useTodoEditForm = () => {
  const route = useRoute<RouteProp<RootParamList>>();
  const id = route.params?.id;
  if (!id) {
    throw new Error('id is required');
  }

  const [getTodo] = useLazyGetTodoQuery();

  const [updateTodo, {isLoading}] = useUpdateTodoUseCase();

  useIndicator(isLoading);

  const {fields, handleSubmit} = useForm(updateTodoSchema, {
    defaultValues: async () => {
      const {data} = await getTodo(id);
      return {description: data?.description, title: data?.title};
    },
  });

  const onPressButton = useMemo(
    () =>
      handleSubmit(async values => {
        const item = Todo.create({
          description: values.description,
          id,
          title: values.title,
        });
        await updateTodo({item});
      }),
    [handleSubmit, updateTodo, id],
  );

  return {fields, onPressButton};
};
