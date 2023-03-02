import React from 'react';

import {Dialog} from '@/components/features/modal/Dialog';
import {SpaceInset, SpaceStack} from '@/components/ui/Spacing';
import {Text} from '@/components/ui/Text';

import {Props} from './types';

export const MessageDialog: React.FC<Props> = ({
  message,
  title,
  ...modalProps
}) => {
  return (
    <Dialog {...modalProps}>
      <SpaceInset horizontal="l">
        <Text size="xxl" weight="bold" align="center">
          {title}
        </Text>
        {message && (
          <>
            <SpaceStack size="s" />
            <Text size="xl" align="left">
              {message}
            </Text>
          </>
        )}
      </SpaceInset>
    </Dialog>
  );
};
