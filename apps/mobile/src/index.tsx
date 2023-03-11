import {API_BASE_URL, NAME} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from '@domain/app/redux';
import {EnvironmentService} from '@domain/app/services/EnvironmentService';
import {ReduxProvider} from '@domain/app/services/redux/ReduxProvider';

import {ConnectedModal} from '@/components/features/modal';
import {ConnectedBlockingIndicator} from '@/components/features/modal/BlockingIndicator';
import {ConnectedTransientToastList} from '@/components/features/toast/TransientToastList';
import {RootNavigator} from '@/navigation/navigators';
import {navigationRef} from '@/services/navigation/Navigation';
import {RootState} from '@/services/redux/rootReducer';
import {AppDispatch, configureStore} from '@/services/redux/store';

EnvironmentService.create({API_BASE_URL, NAME});
// TokenStorage.create(createAuthTokenRepository());

const store = configureStore();
const reduxProvider = ReduxProvider.create<RootState, AppDispatch>();
reduxProvider.setContext(store);

export const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
          <ConnectedBlockingIndicator />
          <ConnectedModal />
          <ConnectedTransientToastList />
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
