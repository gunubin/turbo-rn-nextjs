type ParamListBase = Record<string, object | undefined>;

export interface INavigation<
  TParamList extends ParamListBase = any /*FIXME: 厳密にするのかどうか*/
> {
  navigate<TRouteName extends keyof TParamList>(
    name: TRouteName,
    params?: TParamList[TRouteName]
  ): void;
  reset(name: string, params?: object | undefined): void;
  goBack(): void;
  // setParams<ParamList extends ParamListBase>(params: Partial<ParamList>): void;
  replace(name: string, params?: object | undefined): void;
  push(name: string, params?: object | undefined): void;
  pop(count: number): void;
  popToTop(): void;
}
