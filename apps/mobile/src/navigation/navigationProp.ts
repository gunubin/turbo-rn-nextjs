// import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootParamList} from '@/navigation/routes';

// export type RootNavigationProp<T extends keyof RootParamList> =
//   CompositeNavigationProp<
//     StackNavigationProp<RootParamList, T>,
//     StackNavigationProp<HomeTabParamList>
//     >;
export type RootNavigationProp<T extends keyof RootParamList> =
  StackNavigationProp<RootParamList, T>;
