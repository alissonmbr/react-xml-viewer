import { useXMLViewerContext } from 'context/xml-viewer-context';
import _isNil from 'lodash/isNil';
import { useEffect, useState } from 'react';

export function useCollapsible(level: number) {
  const { collapsible, initalCollapsedDepth } = useXMLViewerContext();
  const [collapsed, setCollapsed] = useState(() =>
    _isNil(initalCollapsedDepth) || !collapsible ? false : level >= initalCollapsedDepth,
  );
  const toggleCollapsed = () => setCollapsed((currentCollapsed) => !currentCollapsed);

  useEffect(() => {
    setCollapsed(
      _isNil(initalCollapsedDepth) || !collapsible ? false : level >= initalCollapsedDepth,
    );
  }, [initalCollapsedDepth, level, collapsible]);

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
