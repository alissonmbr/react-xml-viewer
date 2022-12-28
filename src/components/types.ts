import { ReactNode } from "react";

export interface Theme {
  /**
   *
   */
  tagColor?: string;
  /**
   *
   */
  textColor?: string;
  /**
   *
   */
  attributeKeyColor?: string;
  /**
   *
   */
  attributeValueColor?: string;
  /**
   *
   */
  separatorColor?: string;
  /**
   *
   */
  commentColor?: string;
  /**
   *
   */
  cdataColor?: string;
  /**
   *
   */
  overflowBreak?: boolean;
}

export interface XMLViewerProps {
  /**
   * A xml in string format
   */
  xml: string;
  /**
   *
   */
  theme?: Theme;
  /**
   *
   */
  indentSize?: number;
  /**
   *
   */
  invalidXml?: ReactNode;
  /**
   *
   */
  collapsible?: boolean;
}
