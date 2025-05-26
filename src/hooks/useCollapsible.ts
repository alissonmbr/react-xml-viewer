import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useEffect, useState } from 'react';

export function useCollapsible(level: number) {
  const { collapsible, initialCollapsedDepth } = useXMLViewerContext();
  const hasInitialCollapsedDepth =
    initialCollapsedDepth !== undefined && initialCollapsedDepth !== null;
  const [collapsed, setCollapsed] = useState(() =>
    !hasInitialCollapsedDepth || !collapsible ? false : level >= initialCollapsedDepth,
  );
  const toggleCollapsed = () => setCollapsed((currentCollapsed) => !currentCollapsed);

  useEffect(() => {
    setCollapsed(
      !hasInitialCollapsedDepth || !collapsible ? false : level >= initialCollapsedDepth,
    );
  }, [initialCollapsedDepth, level, collapsible]);

  return {
    collapsed,
    buttonProps: !collapsible
      ? {}
      : {
          onClick: toggleCollapsed,
          role: 'button',
          style: { cursor: 'pointer' },
        },
  };
}
