import { useLineNumberContext } from 'context/line-number-context';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const getParentOffset = (element: HTMLElement | null): number => {
  if (!element || !element.parentElement) {
    return 0;
  }

  if (element.parentElement?.checkVisibility?.()) {
    return element.parentElement.offsetTop;
  }

  return getParentOffset(element.parentElement);
};

interface LineNumbersProps {
  viewerContainer: HTMLDivElement | null;
}

export function LineNumbers({ viewerContainer }: LineNumbersProps) {
  const { lines, reset } = useLineNumberContext();
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const lineNumbersContainer = useRef<HTMLDivElement | null>(null);
  const sortedLines = useMemo(
    () =>
      Object.values(lines)
        .map((line) => {
          const visible = /* line.visible && */ line.element?.checkVisibility();
          return {
            ...line,
            offset: visible ? line.element?.offsetTop : getParentOffset(line.element),
            visible,
          };
        })
        .sort((a, b) => {
          if (a.offset === b.offset) {
            if (a.element.checkVisibility() === b.element.checkVisibility()) {
              return 0;
            }
            return !a.element.checkVisibility() ? 1 : -1;
          }
          return a.offset - b.offset;
        })
        .map((line, index) => {
          return {
            ...line,
            lineNumber: index + 1,
          };
        })
        .filter((line) => line.visible),
    [lines, containerDimensions.width, containerDimensions.height],
  );

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(function (entries) {
      const { width, height } = entries[0].contentRect;
      setContainerDimensions({ width, height });
    });
  }, []);

  useLayoutEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (viewerContainer) {
      resizeObserver.observe(viewerContainer);
    }
  });

  useEffect(() => {
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={lineNumbersContainer}
      style={{
        width: 300,
        height: 'auto',
        backgroundColor: '#aaa',
        marginRight: 16,
        position: 'relative',
      }}
    >
      {sortedLines.map((line) => (
        <div
          key={line.lineNumber}
          style={{
            position: 'absolute',
            top: line.offset - (lineNumbersContainer.current?.offsetTop ?? 0),
            right: 8,
          }}
        >
          {line.lineNumber}
        </div>
      ))}
    </div>
  );
}
