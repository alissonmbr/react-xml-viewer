import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ILineNumberContext, Line } from 'types';

const defaultState: ILineNumberContext = {
  lines: {},
  push: () => undefined,
  reset: () => undefined,
};

const LineNumberContextInner = createContext<ILineNumberContext>(defaultState);

export const LineNumberContext = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<Record<string, Line>>({});

  const push = useCallback((key: string, line: Line) => {
    setLines((prev) => {
      if (prev[key]?.element === line.element) {
        return prev;
      }

      return { ...prev, [key]: line };
    });
  }, []);

  const reset = useCallback(() => {
    setLines({});
  }, []);

  const value = useMemo(() => ({ lines, push, reset }), [lines, push, reset]);

  return (
    <LineNumberContextInner.Provider value={value}>{children}</LineNumberContextInner.Provider>
  );
};

export const useLineNumberContext = () => useContext(LineNumberContextInner);
