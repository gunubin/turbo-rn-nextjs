import {AppError, NetworkError, ValidError} from '@app/services/error/errors';
import {ErrorHandler} from '@app/services/error/types';

export const applicationErrorHandler: ErrorHandler<AppError> = () => {
  return [
    {
      displayType: 'dialog',
      message: 'アプリでエラーが発生しました。',
      title: 'エラー',
    },
    {
      displayType: 'toast',
      message: 'アプリでエラーが発生しました。',
      title: 'エラー',
    },
  ];
};

export const networkErrorHandler: ErrorHandler<NetworkError> = (error) => {
  if (
    error.original.isValidationError() &&
    (!error.base || error.base?.length === 0) // fieldsはあるが、baseがない場合はdialog表示しない
  ) {
    return undefined;
  }
  if (error.status === 422) {
    return [
      {
        displayType: 'dialog',
        message:
          'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。', // baseが設定されるが一応デフォルトで文言用意
        title: '',
      },
      {
        displayType: 'toast',
        message:
          'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。', // baseが設定されるが一応デフォルトで文言用意
        title: '',
      },
    ];
  }
  return [
    {
      displayType: 'dialog',
      message:
        'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。',
      title: 'ネットワークエラー',
    },
    {
      displayType: 'toast',
      message:
        'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。',
    },
  ];
};

export const validErrorHandler: ErrorHandler<ValidError> = (error) => {
  if (error.original.isValidationError()) {
    return {
      displayType: 'dialog',
      message: error.fields?.join(' '),
      title: '',
    };
  }

  return [
    {
      displayType: 'dialog',
      message:
        'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。',
      title: 'ネットワークエラー',
    },
    {
      displayType: 'toast',
      message:
        'サーバーでエラーが発生しました。少し時間をおいて再度お試しください。',
    },
  ];
};
