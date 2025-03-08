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
  parentKey?: string;
}
export function Elements(props: ElementsProps) {
  const { elements, level = 0, isText = true, parentKey = '' } = props;
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
        const key = `${parentKey}-${level + 1}-${index + 1}`;
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
                keyValue={key}
              />
            );
          case ATTRIBUTE_COMMENT:
            return (
              <CommentTag
                key={key}
                keyValue={key}
                isInline={isInline}
                indentation={indentation}
                level={level}
              >
                <Elements
                  elements={subElements as Element[]}
                  level={level + 1}
                  parentKey={key}
                  isText={false}
                />
              </CommentTag>
            );
          case ATTRIBUTE_CDATA:
            return (
              <CDataTag key={key} keyValue={key} indentation={indentation} isInline={isInline}>
                <Elements
                  elements={subElements as Element[]}
                  level={level + 1}
                  parentKey={key}
                  isText={false}
                />
              </CDataTag>
            );
          case DECLARATION_TAG:
            return (
              <DeclarationTag
                key={key}
                indentation={indentation}
                tagKey={tagKey}
                attributes={attributes}
                keyValue={key}
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
                keyValue={key}
              >
                <Elements elements={subElements as Element[]} level={level + 1} parentKey={key} />
              </Tag>
            );
        }
      })}
    </>
  );
}
