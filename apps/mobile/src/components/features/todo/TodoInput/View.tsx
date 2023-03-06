import {Fields} from 'form';
import {Alert, Button, HStack} from 'native-base';
import React from 'react';

import {FormValues} from '@domain/todo/forms/addTodo';

import {Input} from '@/components/ui/Input';

type Props = {
  fields: Fields<FormValues>;
  onPressButton: () => void;
};

export const TodoInput: React.FC<Props> = ({fields, onPressButton}) => {
  return (
    <>
      <HStack space={2}>
        <Input flex={1} placeholder={'Add Task'} {...fields.title} />
        <Button onPress={onPressButton}>追加</Button>
      </HStack>
      {fields.title.error && <Alert>{fields.title.error?.message}</Alert>}
    </>
  );
};
