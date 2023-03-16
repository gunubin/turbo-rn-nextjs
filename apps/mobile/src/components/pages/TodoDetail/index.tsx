import {Center, Container, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';

import {ConnectedTodoEditForm} from '@/components/features/todo/TodoEditForm';

export const TodoDetail = () => {
  return (
    <SafeAreaView>
      <Center w="100%">
        <Container>
          <VStack space={4}>
            <ConnectedTodoEditForm />
          </VStack>
        </Container>
      </Center>
    </SafeAreaView>
  );
};
