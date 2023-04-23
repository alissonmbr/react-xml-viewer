import { useState } from "react";
import { useXMLViewerContext } from "../xml-viewer-context";

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
            role: "button",
            style: { cursor: "pointer" },
          },
    };
  }