import React from 'react';

import {Button} from '@/components/ui/Button';
export type Action = Pick<
  React.ComponentProps<typeof Button>,
  'onPress' | 'children' | 'type'
>;

export type Props = {
  children: React.ReactNode;
  onRequestClose?: () => void;
  actions?: [Action, Action] | [Action];
  isVisible: boolean;
};
