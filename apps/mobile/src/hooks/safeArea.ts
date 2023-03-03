import {safeAreaInset} from '@/styles/spacing';
import {useMemo} from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useSafeAreaBottomInset = (
  bottom: number = safeAreaInset.bottom, // safeAreaがない端末で担保する余白
) => {
  const insets = useSafeAreaInsets();
  return useMemo(
    () => (insets.bottom === 0 ? bottom : Math.max(insets.bottom, bottom)),
    [insets.bottom, bottom],
  );
};

export const useSafeAreaTopInset = (top: number = safeAreaInset.top) => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  if (isIOS) {
    return insets.top === 0 ? top : Math.max(insets.top, top);
  } else {
    return top;
  }
};
