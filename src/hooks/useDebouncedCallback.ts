import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  wait: number,
) {
  // Store the callback in a ref to always have the latest version
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Update ref to latest callback on every render
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: A) => {
      // Clear previous timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timer
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, wait);
    },
    [wait],
  );
}
