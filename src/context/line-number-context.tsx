import { useDebouncedCallback } from 'hooks/useDebouncedCallback';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ILineNumberContext, Line } from 'types';

const defaultState: ILineNumberContext = {
  lines: {},
  push: () => undefined,
};

const LineNumberContextInner = createContext<ILineNumberContext>(defaultState);

type LineNumberContextProps = {
  children: ReactNode;
  enabled: boolean;
};

export const LineNumberContext = ({ children, enabled = false }: LineNumberContextProps) => {
  const [lines, setLines] = useState<Record<string, Line>>({});
  const linesRef = useRef<Record<string, Line>>({});
  const updateLines = useCallback(() => {
    setLines(linesRef.current);
  }, []);
  const debouncedUpdateLines = useDebouncedCallback(updateLines, 100);

  const push = useCallback((key: string, line: Line) => {
    if (!enabled) {
      return;
    }

    if (linesRef.current[key]?.element !== line.element) {
      linesRef.current[key] = line;
    }

    debouncedUpdateLines();
  }, []);

  const value = useMemo(() => ({ lines, push }), [lines, push, enabled]);

  return (
    <LineNumberContextInner.Provider value={value}>{children}</LineNumberContextInner.Provider>
  );
};

export const useLineNumberContext = () => useContext(LineNumberContextInner);
