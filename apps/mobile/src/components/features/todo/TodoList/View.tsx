import {Button, HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';

import {Todo} from '@domain/todo/models/todo/Todo';
import {TodoId} from '@domain/todo/models/todo/TodoId';

type Props = {
  list?: Todo[];
  onPressDelete: (id: TodoId) => void;
  onPressItem: (id: TodoId) => void;
};

export const TodoList: React.FC<Props> = ({
  list,
  onPressDelete,
  onPressItem,
}) => {
  const items = list?.map(item => {
    return (
      <HStack key={item.id} w="100%">
        <Pressable flex={1} onPress={() => onPressItem(item.id)}>
          <Text flexShrink={1} fontSize="md">
            {item.title}
          </Text>
        </Pressable>
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
