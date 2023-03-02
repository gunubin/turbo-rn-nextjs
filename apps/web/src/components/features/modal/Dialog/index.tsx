import React from 'react';

import {Button} from '@/components/ui/Button';

import {Props} from './types';

export const Dialog: React.FC<Props> = ({isVisible, children, actions}) => {
  return (
    <>
      <div
        className={`modal fade ${isVisible && 'show'} `}
        style={{display: isVisible ? 'block' : 'none'}}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {children}
            <div className="modal-footer">
              {actions && (
                <>
                  {actions.map((action, index) => {
                    return (
                      <Button
                        key={index}
                        type={action.type}
                        onPress={action.onPress}
                      >
                        {action.children}
                      </Button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
