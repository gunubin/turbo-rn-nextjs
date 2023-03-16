import Router from 'next/router';
import {Route, Query} from 'nextjs-routes';

import {INavigation} from '@domain/app/services/navigation/types';

interface StaticRoute<Pathname = string> {
  pathname: Pathname;
  query?: Query | undefined;
  hash?: string | null | undefined;
}

type ParamList<TRoute extends StaticRoute> = Record<
  TRoute['pathname'],
  TRoute['query']
>;

export const createNavigation = (): INavigation<ParamList<Route>> => {
  return {
    goBack: (): void => {
      Router.back();
    },
    navigate: (name, params?) => {
      Router.push({pathname: name, query: params});
    },
    pop: () => {
      // TODO:
    },
    popToTop: () => {
      // TODO:
    },
    push: (name, params?) => {
      Router.push({pathname: name, query: params});
    },
    replace: (name, params?) => {
      Router.replace({pathname: name, query: params});
    },
    reset: (name, params?): void => {
      Router.replace({pathname: name, query: params});
    },
  };
};
