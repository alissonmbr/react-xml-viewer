import { defaultTheme } from 'contants';
import { LineNumberContext } from 'context/line-number-context';
import { XMLViewerContext } from 'context/xml-viewer-context';
import { isNextThemeEqual } from 'helpers';
import useXMLViewer from 'hooks/useXMLViewer';
import { useEffect, useMemo, useState } from 'react';
import { Elements } from './Elements';
import { InvalidXml } from './InvalidXml';
import { LineNumbers } from './LineNumbers';
import { Theme, XMLViewerProps } from './types';

export default function XMLViewer(props: XMLViewerProps): JSX.Element {
  const {
    theme: customTheme,
    xml,
    collapsible = false,
    indentSize = 2,
    invalidXml,
    initialCollapsedDepth,
    showLineNumbers = false,
  } = props;
  const [theme, setTheme] = useState<Theme>(() => ({ ...defaultTheme, ...customTheme }));
  const { json, valid } = useXMLViewer(xml);
  const [viewerContainer, setViewerContainer] = useState<HTMLDivElement | null>(null);

  const context = useMemo(
    () => ({
      theme,
      collapsible,
      indentSize,
      initialCollapsedDepth,
    }),
    [theme, collapsible, indentSize, initialCollapsedDepth],
  );

  useEffect(() => {
    setTheme((currentTheme) => {
      const nextTheme = { ...defaultTheme, ...customTheme };
      return isNextThemeEqual(nextTheme, currentTheme) ? currentTheme : nextTheme;
    });
  }, [customTheme]);

  if (!valid) {
    return invalidXml ? invalidXml : <InvalidXml />;
  }

  return (
    <XMLViewerContext.Provider value={context}>
      <LineNumberContext key={xml}>
        <div
          className="rxv-container"
          style={{
            fontFamily: theme.fontFamily,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {showLineNumbers && <LineNumbers viewerContainer={viewerContainer} />}
          <div
            ref={setViewerContainer}
            style={{
              flex: 1,
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              overflow: 'auto',
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: collapsible ? 10 : 0,
            }}
          >
            <Elements elements={json} />
          </div>
        </div>
      </LineNumberContext>
    </XMLViewerContext.Provider>
  );
}
