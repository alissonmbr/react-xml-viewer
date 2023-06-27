import { CDataTag } from 'components/CDataTag';
import { CommentTag } from 'components/CommentTag';
import { DeclarationTag } from 'components/DeclarationTag';
import { Tag } from 'components/Tag';
import { TextElement } from 'components/TextElement';
import { ATTRIBUTE_CDATA, ATTRIBUTE_COMMENT, ATTRIBUTE_TEXT, DECLARATION_TAG } from 'contants';
import { useXMLViewerContext } from 'context/xml-viewer-context';
import { getIndentationString, getTagProps, isInlineTextElement } from 'helpers';
import { Element } from 'types';

export interface ElementsProps {
  elements: Element[];
  level?: number;
  isText?: boolean;
}
export function Elements(props: ElementsProps) {
  const { elements, level = 0, isText = true } = props;
  const { indentSize } = useXMLViewerContext();

  if (!Array.isArray(elements) || elements.length === 0) {
    return null;
  }

  return (
    <>
      {elements.map((element, index) => {
        const { tagKey, attributes, subElements, type } = getTagProps(element);
        const hasSiblings = elements.length > 1;
        const indentation = getIndentationString(indentSize, level);
        const key = `${level}-${index}`;
        const isInline = isInlineTextElement(subElements);

        switch (type) {
          case ATTRIBUTE_TEXT:
            return (
              <TextElement
                key={key}
                text={subElements as string}
                indentation={indentation}
                hasSiblings={hasSiblings}
                isText={isText}
              />
            );
          case ATTRIBUTE_COMMENT:
            return (
              <CommentTag key={key} isInline={isInline} indentation={indentation} level={level}>
                <Elements elements={subElements as Element[]} level={level + 1} isText={false} />
              </CommentTag>
            );
          case ATTRIBUTE_CDATA:
            return (
              <CDataTag key={key} indentation={indentation} isInline={isInline}>
                <Elements elements={subElements as Element[]} level={level + 1} isText={false} />
              </CDataTag>
            );
          case DECLARATION_TAG:
            return (
              <DeclarationTag
                key={key}
                indentation={indentation}
                tagKey={tagKey}
                attributes={attributes}
              />
            );
          default:
            return (
              <Tag
                key={key}
                indentation={indentation}
                tagKey={tagKey}
                attributes={attributes}
                isInline={isInline}
                hasChildren={subElements.length > 0}
                level={level}
              >
                <Elements elements={subElements as Element[]} level={level + 1} />
              </Tag>
            );
        }
      })}
    </>
  );
}
