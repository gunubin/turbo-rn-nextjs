import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {screenViewConfig as topScreenViewConfig} from '@mobile/components/pages/Top/screen';
import {RootParamList} from '@mobile/navigation/routes';

import * as routeNames from './routeNames';

const RootStack = createStackNavigator<RootParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen {...topScreenViewConfig} name={routeNames.TOP_PAGE} />
    </RootStack.Navigator>
  );
};
