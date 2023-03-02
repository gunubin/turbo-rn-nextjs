import {
  stackFactory,
  queueFactory,
  insetFactory,
} from 'react-native-spacing-system';

import {space} from '@/styles/spacing';

export const SpaceStack = stackFactory(space);
export const SpaceQueue = queueFactory(space);
export const SpaceInset = insetFactory(space);
