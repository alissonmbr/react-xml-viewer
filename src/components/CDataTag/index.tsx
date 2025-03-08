import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useLineNumber } from 'hooks/useLineNumber';
import { ReactNode } from 'react';

export interface CDataTagProps {
  indentation: string;
  children: ReactNode;
  isInline: boolean;
  keyValue: string;
}

export function CDataTag(props: CDataTagProps) {
  const { indentation, children, isInline, keyValue } = props;
  const { theme } = useXMLViewerContext();
  const openTagRef = useLineNumber<HTMLSpanElement>(keyValue);
  const closeTagRef = useLineNumber<HTMLSpanElement>(`${keyValue}-close`, !isInline);

  return (
    <div style={{ color: theme.cdataColor }}>
      <span ref={openTagRef}>{`${indentation}<![CDATA[`}</span>
      {children}
      <span ref={closeTagRef}>{`${isInline ? '' : indentation}]]>`}</span>
    </div>
  );
}
