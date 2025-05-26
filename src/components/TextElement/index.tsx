import { useXMLViewerContext } from 'context/xml-viewer-context';
import { useLineNumber } from 'hooks/useLineNumber';
import { hasBreakLines } from '../../helpers';

export interface TextElementProps {
  text: string;
  hasSiblings: boolean;
  indentation: string;
  isText: boolean;
  keyValue: string;
}

export interface TextElementItemProps {
  children: string;
  keyValue: string;
}

export function TextElementItem(props: TextElementItemProps) {
  const { children, keyValue } = props;
  const elementRef = useLineNumber<HTMLDivElement>(keyValue);

  return <div ref={elementRef}>{children}</div>;
}

export function TextElement(props: TextElementProps) {
  const { hasSiblings, text, indentation, isText, keyValue } = props;
  const { theme } = useXMLViewerContext();
  const style = isText ? { color: theme.textColor } : undefined;

  return hasBreakLines(text) || hasSiblings ? (
    <div style={style}>
      {text
        .split('\n')
        .filter((element) => !!element.trim())
        .map((line, index) => (
          <TextElementItem
            key={`${keyValue}${index}`}
            keyValue={`${keyValue}${index}`}
          >{`${indentation}${line.trim()}`}</TextElementItem>
        ))}
    </div>
  ) : (
    <span style={style}>{text}</span>
  );
}
