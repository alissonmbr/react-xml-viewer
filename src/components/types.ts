export interface Theme {
  /**
   * The tag name color (`<tag-name />`)
   *
   * @default #d43900
   */
  tagColor?: string;
  /**
   * The text color (`<tag>Text</tag>`)
   *
   * @default #333
   */
  textColor?: string;
  /**
   * The attribute key color (`<tag attribute-key="hello" />`)
   *
   * @default #2a7ab0
   */
  attributeKeyColor?: string;
  /**
   * The attribute value color (` <tag attr="Attribute value">`)
   *
   * @default #008000
   */
  attributeValueColor?: string;
  /**
   * The separators colors (`<, >, </, />, =, <?, ?>`)
   *
   * @default #333
   */
  separatorColor?: string;
  /**
   * The comment color (`<!-- this is a comment -->`)
   *
   * @default #aaa
   */
  commentColor?: string;
  /**
   * the cdata element color (`<![CDATA[some stuff]]>`)
   *
   * @default #1D781D
   */
  cdataColor?: string;
  /**
   * The font family
   *
   * @default monospace
   */
  fontFamily?: string;
  /**
   * The line number container background color
   *
   * @default #eee
   */
  lineNumberBackground?: string;
  /**
   * The line number color
   *
   * @default #222
   */
  lineNumberColor?: string;
}

export interface XMLViewerProps {
  /**
   * A xml string to prettify.
   */
  xml: string;
  /**
   * An object to customize the default theme.
   *
   * @default
   * ```js
   * {
   *   tagColor: '#d43900',
   *   textColor: '#333',
   *   attributeKeyColor: '#2a7ab0',
   *   attributeValueColor: '#008000',
   *   separatorColor: '#333',
   *   commentColor: '#aaa',
   *   cdataColor: '#1d781d',
   *   fontFamily: 'monospace',
   * }
   * ```
   */
  theme?: Theme;
  /**
   * The size of the indentation.
   *
   * @default 2
   */
  indentSize?: number;
  /**
   * When the xml is invalid, invalidXml component will be returned.
   *
   * @default <div>Invalid XML!</div>
   */
  invalidXml?: JSX.Element;
  /**
   * Allow collapse/expand tags by click on them. When tag is collapsed its content and attributes are hidden.
   *
   * @default false
   */
  collapsible?: boolean;
  /**
   * When the **collapsible** is true, this set the level that will be started as collapsed.
   * For example, if you want to everything starts as collapsed, set 0.
   *
   * @default undefined
   */
  initialCollapsedDepth?: number;
  /**
   * Show line numbers.
   *
   * @default false
   */
  showLineNumbers?: boolean;
}
