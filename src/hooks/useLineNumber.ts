import { useLineNumberContext } from 'context/line-number-context';
import { useEffect, useRef } from 'react';

export function useLineNumber<T extends HTMLElement = HTMLElement>(key: string, enabled = true) {
  const { push } = useLineNumberContext();
  const tagRef = useRef<T>(null);

  useEffect(() => {
    if (enabled && tagRef.current && key) {
      push(key, { element: tagRef.current });
    }
  }, [tagRef.current, push, key, enabled]);

  return tagRef;
}
