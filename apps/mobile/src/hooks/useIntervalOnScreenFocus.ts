import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useRef} from 'react';

/**
 * setIntervalのhooks関数です。
 *
 * useFocusEffectを使っているのでreact-navigationに依存
 * @param callback
 * @param ms
 * @param options {leading: boolean} useEffectと同時にcallbackを実行するかどうか
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

/**
 * setTimeoutのhooks関数です。
 *
 * @param callback
 * @param ms
 */
export const useTimeout = (callback: () => void, ms: number) => {
  const cb = useRef<() => void>();
  useEffect(() => {
    cb.current = callback;
    const id = setTimeout(() => {
      cb.current && cb.current();
    }, ms);
    return () => {
      clearTimeout(id);
    };
  }, [ms, callback]);
};
