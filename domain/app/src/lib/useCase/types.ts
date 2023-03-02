export const useCaseEventTypes = {
  commanded: 'commanded',
  failed: 'failed',
  succeeded: 'succeeded',
};
export type UseCaseEventType = keyof typeof useCaseEventTypes;

// TODO: id文字列だと破綻する。useCaseの関数名で型作ったほうがいい
export type UseCaseCommand = {
  id: string;
};

export type UseCaseEventCommanded = {
  type: typeof useCaseEventTypes.commanded;
  command: UseCaseCommand;
};
export type UseCaseEventFailed = {
  type: typeof useCaseEventTypes.failed;
  command: UseCaseCommand;
  error: any;
};
export type UseCaseEventSucceeded = {
  type: typeof useCaseEventTypes.succeeded;
  command: UseCaseCommand;
  result: any;
};
export type UseCaseEvent =
  | UseCaseEventCommanded
  | UseCaseEventSucceeded
  | UseCaseEventFailed;

export interface IUseCaseState {
  fail(params: UseCaseCommand & Pick<UseCaseEventFailed, 'error'>): void;
  command(params: UseCaseCommand): void;
  success(params: UseCaseCommand & Pick<UseCaseEventSucceeded, 'result'>): void;
}
