import {
  createNavigationContainerRef,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';

import {INavigation} from '@domain/app/services/navigation/types';

export const navigationRef = createNavigationContainerRef<any>();

export const createNavigation = <
  TParamList extends ParamListBase,
>(): INavigation<TParamList> => {
  return {
    goBack: (): void => {
      navigationRef.goBack();
    },
    navigate: <TRouteName extends keyof TParamList>(
      name: TRouteName,
      params?: TParamList[TRouteName],
    ) => {
      navigationRef.navigate(name as string, params);
    },
    pop: (count = 1) => {
      navigationRef.dispatch(StackActions.pop(count));
    },
    popToTop: () => {
      navigationRef.dispatch(StackActions.popToTop());
    },
    push: (name, params) => {
      navigationRef.dispatch(StackActions.push(name as string, params));
    },
    replace: (name, params) => {
      navigationRef.dispatch(StackActions.replace(name as string, params));
    },
    reset: (name, params) => {
      navigationRef.resetRoot({
        index: 0,
        routes: [
          {
            name: name as string,
            params,
          },
        ],
      });
    },
  };
};
