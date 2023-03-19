
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
