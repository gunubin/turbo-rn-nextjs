import {createNavigationContainerRef, ParamListBase, StackActions} from '@react-navigation/native';

import {INavigation} from '@mobile/services/navigation/types';

export const navigationRef =
  createNavigationContainerRef<any /*FIXME: navigationRef.navigateの型エラーが解決できない*/>();

// TODO:
export const createNavigation = <TParamList extends ParamListBase>(): INavigation<TParamList> => {
  return {
    goBack: (): void => {
      navigationRef.goBack();
    },
    navigate: <TRouteName extends keyof TParamList>(
      name: TRouteName,
      params?: TParamList[TRouteName]
    ) => {
      navigationRef.navigate(name as string, params);
    },
    pop: (count = 1) => {
      navigationRef.dispatch(StackActions.pop(count));
    },
    popToTop: () => {
      navigationRef.dispatch(StackActions.popToTop());
    },
    push: (name: string, params?: object | undefined) => {
      navigationRef.dispatch(StackActions.push(name, params));
    },
    replace: (name: string, params?: object | undefined) => {
      navigationRef.dispatch(StackActions.replace(name, params));
    },
    reset: (name: string, params?: object | undefined) => {
      navigationRef.resetRoot({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      });
    },
  };
};
