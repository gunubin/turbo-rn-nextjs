import {Center, Container, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';

import {ConnectedTodoInput} from '@/components/features/todo/TodoInput';
import {ConnectedTodoList} from '@/components/features/todo/TodoList';

export const Top = () => {
  return (
    <SafeAreaView>
      <Center w="100%">
        <Container>
          <VStack space={4}>
            <ConnectedTodoInput />
            <ConnectedTodoList />
          </VStack>
        </Container>
      </Center>
    </SafeAreaView>
  );
};
