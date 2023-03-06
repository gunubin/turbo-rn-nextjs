import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef} from 'react';

/**
 * setIntervalのhooks関数です。
 *
 * useFocusEffectを使っているのでreact-navigationに依存
 * @param callback - callback
 * @param ms - ms
 * @param options - options
 * @param options.leading - useEffectと同時にcallbackを実行するかどうか
 */
export const useIntervalOnScreenFocus = (
  callback: () => void,
  ms: number,
  options: {leading: boolean} = {leading: false},
) => {
  const cb = useRef<() => void>();
  useFocusEffect(
    useCallback(() => {
      cb.current = callback;
      if (options.leading) {
        cb.current && cb.current();
      }
      const id = setInterval(() => {
        cb.current && cb.current();
      }, ms);
      return () => {
        clearInterval(id);
      };
    }, [ms, callback, options]),
  );
};
