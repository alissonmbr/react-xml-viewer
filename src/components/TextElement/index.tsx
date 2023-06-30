import { hasBreakLines } from '../../helpers';
import { useXMLViewerContext } from 'context/xml-viewer-context';

export interface TextElementProps {
  text: string;
  hasSiblings: boolean;
  indentation: string;
  isText: boolean;
}

export function TextElement(props: TextElementProps) {
  const { hasSiblings, text, indentation, isText } = props;
  const { theme } = useXMLViewerContext();
  const style = isText ? { color: theme.textColor } : undefined;

  return hasBreakLines(text) || hasSiblings ? (
    <div style={style}>
      {text
        .split('\n')
        .filter((element) => !!element.trim())
        .map((line, index) => (
          <div key={`${index}`}>{`${indentation}${line.trim()}`}</div>
        ))}
    </div>
  ) : (
    <span style={style}>{text}</span>
  );
}
