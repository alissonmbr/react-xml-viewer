import { useXMLViewerContext } from 'context/xml-viewer-context';
import { ReactNode } from 'react';

export interface CDataTagProps {
  indentation: string;
  children: ReactNode;
  isInline: boolean;
}

export function CDataTag(props: CDataTagProps) {
  const { indentation, children, isInline } = props;
  const { theme } = useXMLViewerContext();

  return (
    <div style={{ color: theme.cdataColor }}>
      <span>{`${indentation}<![CDATA[`}</span>
      {children}
      <span>{`${isInline ? '' : indentation}]]>`}</span>
    </div>
  );
}
