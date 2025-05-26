import { Theme } from 'components/types';
import {
  ATTRIBUTE_CDATA,
  ATTRIBUTE_COMMENT,
  ATTRIBUTE_GROUP_KEY,
  ATTRIBUTE_TEXT,
  DECLARATION_TAG,
  defaultTheme,
  TAG,
} from 'contants';
import { AttributesObject, Element, ElementObject } from 'types';

export function getIndentationString(size: number, level: number) {
  return new Array(level * size + 1).join(' ');
}

export function hasBreakLines(elements: Element[] | string) {
  return typeof elements === 'string' && elements.includes('\n');
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

function omit<T extends object>(obj: T, keyToOmit: string): Omit<T, keyof T> {
  const result = {} as T;
  for (const key in obj) {
    if (key !== keyToOmit) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function getTagProps(element: Element) {
  const attributes = (element as ElementObject)[ATTRIBUTE_GROUP_KEY] as AttributesObject;
  const elementWithoutAttributes = omit(element, ATTRIBUTE_GROUP_KEY) as Element;
  const [[tagKey, subElements]] = Object.entries(elementWithoutAttributes);
  const type = getTagType(tagKey);
  return { attributes, tagKey, subElements, type };
}

export function isNextThemeEqual(current: Theme, next: Theme): boolean {
  const themeKeys = Object.keys(defaultTheme) as (keyof Theme)[];
  return themeKeys.every((key) => current[key] === next[key]);
}
