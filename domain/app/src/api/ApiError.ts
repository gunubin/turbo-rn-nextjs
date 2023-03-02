import {AxiosError} from 'axios';

export type AxiosErrorData = {
  error: {
    base: string[];
    fields: Record<string, string[]>;
  };
};

export class ApiError extends Error {
  static initWithAxiosError(error: AxiosError<AxiosErrorData>) {
    if (!error.response) {
      return new this(500, '', '', undefined);
    }
    return new this(
      error.response?.status,
      error.code,
      error.message,
      error.response?.data?.error?.base,
      error.response?.data?.error?.fields
    );
  }

  constructor(
    readonly status: number,
    readonly code?: string,
    message?: string,
    readonly base?: string[],
    readonly fields?: Record<string, string[]>
  ) {
    super(message);
  }

  isValidationError(): boolean {
    const {fields = []} = this;
    return Object.keys(fields).length > 0;
  }
}
