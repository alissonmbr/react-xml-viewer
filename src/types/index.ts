import { Theme } from 'components/types';
import { ATTRIBUTE_TEXT } from 'contants';

export interface ElementText {
  [ATTRIBUTE_TEXT]: string;
}

export type AttributeValue = string | number | boolean;

export type AttributesObject = Record<string, AttributeValue>;

export type ElementObject = Record<string, AttributesObject | Element[]>;

export type Element = ElementObject | ElementText;

export interface IXmlViewerContext {
  collapsible: boolean;
  indentSize: number;
  theme: Theme;
  initialCollapsedDepth?: number;
}

export interface Line {
  element: HTMLElement;
}

export interface ILineNumberContext {
  lines: Record<string, Line>;
  push: (key: string, line: Line) => void;
  reset: () => void;
}
