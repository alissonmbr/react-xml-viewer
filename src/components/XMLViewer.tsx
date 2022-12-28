import React, { useEffect, useMemo, useState } from "react";
import { defaultTheme } from "../contants/theme";
import useXMLViewer from "../hooks/useXMLViewer";
import { XMLViewerContext } from "../xml-viewer-context";
import { Theme, XMLViewerProps } from "./types";
import _isEqual from "lodash/isEqual";

export default function XMLViewer(props: XMLViewerProps): JSX.Element {
  const { theme: customTheme, xml, collapsible, indentSize, invalidXml } = props;
  const [theme, setTheme] = useState<Theme>(() => ({ ...defaultTheme, ...customTheme }));
  const { json, valid } = useXMLViewer(xml);
  const context = useMemo(() => ({ theme, collapsible, indentSize }), [theme, collapsible, indentSize]);

  useEffect(() => {
    setTheme(currentTheme => {
      const nextTheme = { ...defaultTheme, ...customTheme };
      return _isEqual(nextTheme, currentTheme) ? currentTheme : nextTheme;
    });
  }, [customTheme]);

  if (!valid) {
    return <div>Invalid</div>;
  }

  return (
    <XMLViewerContext.Provider value={context}>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </XMLViewerContext.Provider>
  );
}
