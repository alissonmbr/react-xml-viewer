import { useLineNumberContext } from 'context/line-number-context';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useEffect, useMemo, useRef, useState } from 'react';
import { checkVisibility, getParentOffset } from './helpers';

interface LineNumbersProps {
  viewerContainer: HTMLDivElement | null;
}

export function LineNumbers({ viewerContainer }: LineNumbersProps) {
  const { lines } = useLineNumberContext();
  const { theme } = useXMLViewerContext();
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const lineNumbersContainer = useRef<HTMLDivElement | null>(null);
  const { sortedLines, numberOfLines } = useMemo(() => {
    const allLines = Object.values(lines)
      .map((line) => {
        const visible = checkVisibility(line.element);
        return {
          ...line,
          offset: visible ? line.element?.offsetTop : getParentOffset(line.element),
          visible,
        };
      })
      .sort((a, b) => {
        if (a.offset === b.offset) {
          if (a.visible === b.visible) {
            return 0;
          }
          return !a.visible ? 1 : -1;
        }
        return a.offset - b.offset;
      })
      .map((line, index) => {
        return {
          ...line,
          lineNumber: index + 1,
        };
      });

    return {
      sortedLines: allLines.filter((line) => line.visible),
      numberOfLines: allLines.length + 1,
    };
  }, [lines, containerDimensions.width, containerDimensions.height]);

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(function (entries) {
      const { width, height } = entries[0].contentRect;
      setContainerDimensions({ width, height });
    });
  }, []);

  useEffect(() => {
    if (viewerContainer) {
      resizeObserver.observe(viewerContainer);
    }
  }, [viewerContainer, resizeObserver]);

  useEffect(() => {
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={lineNumbersContainer}
      style={{
        width: 16 + 8 * String(numberOfLines).length,
        height: 'auto',
        backgroundColor: theme.lineNumberBackground,
        color: theme.lineNumberColor,
        marginRight: 16,
        paddingTop: 8,
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
