import {ModalId} from '@domain/app/models/modal/ModalId';
import {BaseModalPayload} from '@domain/app/services/modal/types';

export type BlockingIndicatorPayload = BaseModalPayload & {
  type: 'blockingIndicator';
  isShowHeaderNavigation: boolean;
} & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const BlockingIndicatorPayload = {
  create: (
    initialId?: string,
    isShowHeaderNavigation?: boolean
  ): BlockingIndicatorPayload => {
    const id = initialId ?? ModalId.create(new Date().getTime().toString());
    return {
      id,
      isShowHeaderNavigation,
      type: 'blockingIndicator',
    } as BlockingIndicatorPayload;
  },
};
