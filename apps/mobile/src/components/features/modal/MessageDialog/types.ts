import React from 'react';

import {Dialog} from '@/components/features/modal/Dialog';

export type Props = {
  type: 'normal' | 'success';
  title: string;
  message?: string;
  children?: never;
  onRequestClose?: () => void;
} & React.ComponentProps<typeof Dialog>;
