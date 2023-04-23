import {
  ATTRIBUTE_CDATA,
  ATTRIBUTE_COMMENT,
  ATTRIBUTE_GROUP_KEY,
  ATTRIBUTE_TEXT,
  DECLARATION_TAG,
  TAG,
} from 'contants';
import _omit from 'lodash/omit';
import { AttributesObject, Element, ElementObject } from 'types';

export function getIndentationString(size: number, level: number) {
  return new Array(level * size + 1).join(' ');
}

export function hasBreakLines(elements: Element[] | string) {
  if (typeof elements === 'string') {
    return elements.includes('\n');
  }
  return false;
}

export function isInlineTextElement(elements: Element[] | string) {
  if (typeof elements === 'string') {
    return false;
  }
  return (
    elements.length === 1 &&
    ATTRIBUTE_TEXT in elements[0] &&
    !hasBreakLines(elements[0][ATTRIBUTE_TEXT] as string)
  );
}

export function getTagType(tagKey: string) {
  switch (tagKey) {
    case ATTRIBUTE_TEXT:
    case ATTRIBUTE_CDATA:
    case ATTRIBUTE_COMMENT:
      return tagKey;
    default:
      return tagKey.startsWith('?') ? DECLARATION_TAG : TAG;
  }
}

export function getTagProps(element: Element) {
  const attributes = (element as ElementObject)[ATTRIBUTE_GROUP_KEY] as AttributesObject;
  const elementWithoutAttributes = _omit(element, ATTRIBUTE_GROUP_KEY) as Element;
  const [[tagKey, subElements]] = Object.entries(elementWithoutAttributes);
  const type = getTagType(tagKey);
  return { attributes, tagKey, subElements, type };
}

export function hasAttributes(attributes: AttributesObject) {
  if (!attributes) {
    return false;
  }

  return Object.keys(attributes).length > 0;
}
