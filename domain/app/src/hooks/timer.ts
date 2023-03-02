import {useEffect, useRef} from 'react';

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
