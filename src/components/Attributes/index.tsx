import { useXMLViewerContext } from 'context/xml-viewer-context';
import { AttributesObject } from 'types';

export interface AttributesProps {
  attributes?: AttributesObject;
}

export function Attributes(props: AttributesProps) {
  const { attributes } = props;
  const { theme } = useXMLViewerContext();

  if (!attributes) {
    return null;
  }

  return (
    <span>
      {Object.entries(attributes).map(([key, value]) => (
        <span key={`attribute-${key}`}>
          <span style={{ color: theme.attributeKeyColor }}>{` ${key}`}</span>
          <span style={{ color: theme.separatorColor }}>=</span>
          <span style={{ color: theme.attributeValueColor }}>{`"${value}"`}</span>
        </span>
      ))}
    </span>
  );
}
