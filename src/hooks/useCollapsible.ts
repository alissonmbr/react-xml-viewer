import { useXMLViewerContext } from 'context/xml-viewer-context';
import _isNil from 'lodash/isNil';
import { useEffect, useState } from 'react';

export function useCollapsible(level: number) {
  const { collapsible, initialCollapsedDepth } = useXMLViewerContext();
  const [collapsed, setCollapsed] = useState(() =>
    _isNil(initialCollapsedDepth) || !collapsible ? false : level >= initialCollapsedDepth,
  );
  const toggleCollapsed = () => setCollapsed((currentCollapsed) => !currentCollapsed);

  useEffect(() => {
    setCollapsed(
      _isNil(initialCollapsedDepth) || !collapsible ? false : level >= initialCollapsedDepth,
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
