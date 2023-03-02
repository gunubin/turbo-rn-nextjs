// import {Route, Query} from 'nextjs-routes';
type Route = any;
type Query = any;

interface StaticRoute<Pathname = string> {
  pathname: Pathname;
  query?: Query | undefined;
  hash?: string | null | undefined;
}

type FindParamList<Target extends StaticRoute> = Record<
  Target['pathname'],
  Target['query']
>;

export type WebParamList = FindParamList<Route>;

type ParamListBase = Record<string, object | undefined>;

export interface INavigation<TParamList extends ParamListBase = any> {
  navigate<TRouteName extends keyof TParamList>(
    name: TRouteName,
    params?: TParamList[TRouteName]
  ): void;
  reset<TRouteName extends keyof TParamList>(
    name: TRouteName,
    params?: TParamList[TRouteName]
  ): void;
  goBack(): void;
  replace<TRouteName extends keyof TParamList>(
    name: TRouteName,
    params?: TParamList[TRouteName]
  ): void;
  push<TRouteName extends keyof TParamList>(
    name: TRouteName,
    params?: TParamList[TRouteName]
  ): void;
  pop(count: number): void;
  popToTop(): void;
}
