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
   * @default monospace
   */
  fontFamily?: string;
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
   * @default 2
   */
  indentSize?: number;
  /**
   *
   */
  invalidXml?: JSX.Element;
  /**
   * @default ''
   */
  className?: string;
  /**
   * @default false
   */
  collapsible?: boolean;
  /**
   * 
   */
  initalCollapsedDepth?: number;
}
