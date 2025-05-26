import { Attributes } from 'components/Attributes';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useLineNumber } from 'hooks/useLineNumber';
import { AttributesObject } from 'types';

export interface DeclarationTagProps {
  indentation: string;
  tagKey: string;
  attributes: AttributesObject;
  keyValue: string;
}

export function DeclarationTag(props: DeclarationTagProps) {
  const { indentation, tagKey, attributes, keyValue } = props;
  const { theme } = useXMLViewerContext();
  const tagRef = useLineNumber<HTMLDivElement>(keyValue);

  return (
    <div ref={tagRef}>
      <span style={{ color: theme.separatorColor }}>{`${indentation}<?`}</span>
      <span style={{ color: theme.tagColor }}>{`${tagKey.slice(1)}`}</span>
      <Attributes attributes={attributes} />
      <span style={{ color: theme.separatorColor }}>{'?>'}</span>
    </div>
  );
}
