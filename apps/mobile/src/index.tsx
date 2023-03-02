import {API_BASE_URL, NAME} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {EnvironmentService} from '@app/services/EnvironmentService';
import {ReduxProvider} from '@app/services/redux/ReduxProvider';

import {RootNavigator} from '@mobile/navigation/navigators';
import {navigationRef} from '@mobile/services/navigation/Navigation';
import {RootState} from '@mobile/services/redux/rootReducer';
import {AppDispatch, configureStore} from '@mobile/services/redux/store';

import {useRootPage} from './hooks';

EnvironmentService.create({API_BASE_URL, NAME});
// TokenStorage.create(createAuthTokenRepository());

const store = configureStore();
const reduxProvider = ReduxProvider.create<RootState, AppDispatch>();
reduxProvider.setContext(store);

export const App = () => {
  useRootPage();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};
