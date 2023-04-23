import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useState } from 'react';

export function useCollapsible() {
  const { collapsible } = useXMLViewerContext();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((currentCollapsed) => !currentCollapsed);

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
