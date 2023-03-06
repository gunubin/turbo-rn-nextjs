import {Button, HStack, Text, VStack} from 'native-base';
import React from 'react';

import {Todo} from '@domain/todo/models/todo/Todo';
import {TodoId} from '@domain/todo/models/todo/TodoId';

type Props = {
  list?: Todo[];
  onPressDelete: (id: TodoId) => void;
};

export const TodoList: React.FC<Props> = ({list, onPressDelete}) => {
  const items = list?.map(item => {
    return (
      <HStack key={item.id} w="100%">
        <Text w="100%" flexShrink={1} fontSize="md">
          {item.title}
        </Text>
        <Button onPress={() => onPressDelete(item.id)}>削除</Button>
      </HStack>
    );
  });
  return (
    <VStack space={2} w="100%">
      {items}
    </VStack>
  );
};
