import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ILineNumberContext, Line } from 'types';

const defaultState: ILineNumberContext = {
  lines: {},
  push: () => undefined,
  reset: () => undefined,
  remove: () => undefined,
};

const LineNumberContextInner = createContext<ILineNumberContext>(defaultState);

export const LineNumberContext = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<Record<string, Line>>({});

  const remove = useCallback((key: string) => {
    // setLines((prev) => {
    //   if (!prev[key]) {
    //     return prev;
    //   }
    //   const newValue = { ...prev }
    //   delete newValue[key];
    //   return newValue;
    // });
  }, []);

  const push = useCallback((key: string, line: Line) => {
    setLines((prev) => {
      if (prev[key]?.element === line.element) {
        return prev;
      }
      // if (prev[key] && prev[key].offset === line.offset && prev[key].visible === line.visible) {
      //   return prev;
      // }

      // if (!line.visible) {
      //   return { ...prev, [key]: { ...line, offset: getParentOffset(line.element) } };
      // }

      return { ...prev, [key]: line };
    });
  }, []);

  const reset = useCallback(() => {
    // setLines({});
  }, []);

  const value = useMemo(() => ({ lines, push, reset, remove }), [lines, push, reset, remove]);

  return (
    <LineNumberContextInner.Provider value={value}>{children}</LineNumberContextInner.Provider>
  );
};

export const useLineNumberContext = () => useContext(LineNumberContextInner);
