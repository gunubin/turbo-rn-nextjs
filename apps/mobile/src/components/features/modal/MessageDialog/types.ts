import React from 'react';

import {Dialog} from '@/components/features/modal/Dialog';

export type Props = {
  type: 'normal' | 'success';
  title: string;
  message?: string;
  onRequestClose?: () => void;
} & Omit<React.ComponentProps<typeof Dialog>, 'children'>;
