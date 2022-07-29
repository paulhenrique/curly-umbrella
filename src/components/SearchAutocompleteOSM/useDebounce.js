import { useRef, useEffect } from "react";
/*
 * Inspired by Dan Abramov's "Making setInterval Declarative with React Hooks",
 * this is a custom hook for debouncing a callback (e.g. for click handlers) such
 * that a callback will not be fired until some delay has passed since the last click.
 * The callback will automatically be updated with the latest props and state on every
 * render meaning that users don't need to worry about stale information being used.
 *
 * See https://overreacted.io/making-setinterval-declarative-with-react-hooks/ for the
 * original inspiration.
 */
export const useDebounce = (callback, delay = 1000) => {
  const latestCallback = useRef();
  const latestTimeout = useRef();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return () => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback?.current && latestCallback?.current();
    }, delay);
  };
};
