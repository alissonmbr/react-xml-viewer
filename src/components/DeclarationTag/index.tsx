import { Attributes } from 'components/Attributes';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { AttributesObject } from 'types';

export interface DeclarationTagProps {
  indentation: string;
  tagKey: string;
  attributes: AttributesObject;
}

export function DeclarationTag(props: DeclarationTagProps) {
  const { indentation, tagKey, attributes } = props;
  const { theme } = useXMLViewerContext();

  return (
    <div>
      <span style={{ color: theme.separatorColor }}>{`${indentation}<?`}</span>
      <span style={{ color: theme.tagColor }}>{`${tagKey.slice(1)}`}</span>
      <Attributes attributes={attributes} />
      <span style={{ color: theme.separatorColor }}>{'?>'}</span>
    </div>
  );
}
