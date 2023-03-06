import {AlertDialog, Button as BaseButton} from 'native-base';
import React from 'react';

import {Button} from '@/components/ui/Button';

import {Props} from './types';

export const Dialog: React.FC<Props> = ({isVisible, children, actions}) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isVisible}>
      <AlertDialog.Content>
        {children}
        {actions && (
          <AlertDialog.Footer>
            <BaseButton.Group space={2}>
              {actions.map((action, i) => (
                <Button key={i} {...action} />
              ))}
            </BaseButton.Group>
          </AlertDialog.Footer>
        )}
      </AlertDialog.Content>
    </AlertDialog>
  );
};
