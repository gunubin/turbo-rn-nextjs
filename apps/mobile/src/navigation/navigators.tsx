import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {screenViewConfig as detailScreenViewConfig} from '@/components/pages/TodoDetail/screen';
import {screenViewConfig as topScreenViewConfig} from '@/components/pages/Top/screen';
import {useRootPage} from '@/hooks';
import {RootParamList} from '@/navigation/routes';

import * as routeNames from './routeNames';

const RootStack = createStackNavigator<RootParamList>();

export const RootNavigator: React.FC = () => {
  useRootPage();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen {...topScreenViewConfig} name={routeNames.TOP_PAGE} />
      <RootStack.Screen
        {...detailScreenViewConfig}
        name={routeNames.DETAIL_PAGE}
      />
    </RootStack.Navigator>
  );
};
