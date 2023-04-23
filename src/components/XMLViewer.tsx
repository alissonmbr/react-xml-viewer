import { useEffect, useMemo, useState } from "react";
import { defaultTheme } from "../contants";
import useXMLViewer from "../hooks/useXMLViewer";
import { XMLViewerContext } from "../xml-viewer-context";
import { Theme, XMLViewerProps } from "./types";
import _isEqual from "lodash/isEqual";
import Elements from "./Elements";
import { InvalidXml } from "./InvalidXml";

export default function XMLViewer(props: XMLViewerProps): JSX.Element {
  const { theme: customTheme, xml, collapsible = false, indentSize = 2, invalidXml } = props;
  const [theme, setTheme] = useState<Theme>(() => ({ ...defaultTheme, ...customTheme }));
  const { json, valid } = useXMLViewer(xml);
  const context = useMemo(() => ({ theme, collapsible, indentSize }), [theme, collapsible, indentSize]);

  useEffect(() => {
    setTheme((currentTheme) => {
      const nextTheme = { ...defaultTheme, ...customTheme };
      return _isEqual(nextTheme, currentTheme) ? currentTheme : nextTheme;
    });
  }, [customTheme]);

  if (!valid) {
    return !!invalidXml ? invalidXml : <InvalidXml />;
  }

  return (
    <XMLViewerContext.Provider value={context}>
      <div
        className="rxv-container"
        style={{ whiteSpace: "pre-wrap", fontFamily: theme.fontFamily, overflowWrap: "break-word" }}
      >
        <Elements elements={json} />
      </div>
      {/* <pre>{JSON.stringify(json, null, 2)}</pre> */}
    </XMLViewerContext.Provider>
  );
}
