import React from 'react';

import {Button} from '@web/components/ui/Button';

export type Action = React.ComponentProps<typeof Button>;

export type Props = {
  onRequestClose?: () => void;
  actions?: [Action, Action] | [Action];
  isVisible: boolean;
  children?: React.ReactNode;
};
