import {Fields} from 'form';
import {Alert, Button, HStack} from 'native-base';
import React from 'react';

import {FormValues} from '@domain/todo/forms/updateTodo';

import {Input} from '@/components/ui/Input';

type Props = {
  fields: Fields<FormValues>;
  onPressButton: () => void;
};

export const TodoEditForm: React.FC<Props> = ({fields, onPressButton}) => {
  return (
    <>
      <HStack w="100%" space={2}>
        <Input w="100%" flex={1} placeholder={'Add Task'} {...fields.title} />
        <Button onPress={onPressButton}>Update</Button>
      </HStack>
      <Input
        mt={2}
        w="100%"
        flex={1}
        placeholder={'Description'}
        {...fields.description}
      />
      {fields.title.error && <Alert>{fields.title.error?.message}</Alert>}
      {fields.description.error && (
        <Alert>{fields.description.error?.message}</Alert>
      )}
    </>
  );
};
