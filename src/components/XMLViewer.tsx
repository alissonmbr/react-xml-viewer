import { defaultTheme } from 'contants';
import { LineNumberContext } from 'context/line-number-context';
import { XMLViewerContext } from 'context/xml-viewer-context';
import useXMLViewer from 'hooks/useXMLViewer';
import _isEqual from 'lodash/isEqual';
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
    initalCollapsedDepth,
    initialCollapsedDepth,
    showLineNumbers,
  } = props;
  const [theme, setTheme] = useState<Theme>(() => ({ ...defaultTheme, ...customTheme }));
  const { json, valid } = useXMLViewer(xml);
  const [viewerContainer, setViewerContainer] = useState<HTMLDivElement | null>(null);

  const context = useMemo(
    () => ({
      theme,
      collapsible,
      indentSize,
      initialCollapsedDepth: initialCollapsedDepth ?? initalCollapsedDepth,
    }),
    [theme, collapsible, indentSize, initalCollapsedDepth, initialCollapsedDepth],
  );

  useEffect(() => {
    setTheme((currentTheme) => {
      const nextTheme = { ...defaultTheme, ...customTheme };
      return _isEqual(nextTheme, currentTheme) ? currentTheme : nextTheme;
    });
  }, [customTheme]);

  if (!valid) {
    return invalidXml ? invalidXml : <InvalidXml />;
  }

  return (
    <XMLViewerContext.Provider value={context}>
      <LineNumberContext>
        <div
          className="rxv-container"
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: theme.fontFamily,
            overflowWrap: 'break-word',
            display: 'inline-flex',
          }}
        >
          {showLineNumbers && <LineNumbers viewerContainer={viewerContainer} />}
          <div
            ref={setViewerContainer}
            style={{
              flex: 1,
              paddingTop: showLineNumbers ? 4 : 0,
              paddingBottom: showLineNumbers ? 4 : 0,
            }}
          >
            <Elements elements={json} />
          </div>
        </div>
      </LineNumberContext>
    </XMLViewerContext.Provider>
  );
}
