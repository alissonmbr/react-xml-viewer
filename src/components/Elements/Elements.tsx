import { ReactNode, useContext, useState } from "react";
import { Element, AttributesObject, ElementObject } from "../../types";
import { ElementsProps } from "./types";
import _omit from "lodash/omit";
import {
  ATTRIBUTE_CDATA,
  ATTRIBUTE_COMMENT,
  ATTRIBUTE_GROUP_KEY,
  ATTRIBUTE_TEXT,
  DECLARATION_TAG,
  TAG,
} from "../../contants";
import Attributes from "../Attributes";
import { XMLViewerContext } from "../../xml-viewer-context";
import { CollapseIcon } from "../CollapseIcon";
import { useCollapsible } from "../../hooks/useCollapsible";

function getIndentationString(size: number, level: number) {
  return new Array(level * size + 1).join(" ");
}

function hasBreakLines(elements: Element[] | string) {
  if (typeof elements === "string") {
    return elements.includes("\n");
  }
  return false;
}

function isInlineTextElement(elements: Element[] | string) {
  if (typeof elements === "string") {
    return false;
  }
  return (
    elements.length === 1 && ATTRIBUTE_TEXT in elements[0] && !hasBreakLines(elements[0][ATTRIBUTE_TEXT] as string)
  );
}

function getTagType(tagKey: string) {
  switch (tagKey) {
    case ATTRIBUTE_TEXT:
    case ATTRIBUTE_CDATA:
    case ATTRIBUTE_COMMENT:
      return tagKey;
    default:
      return tagKey.startsWith("?") ? DECLARATION_TAG : TAG;
  }
}

function getTagProps(element: Element) {
  const attributes = (element as ElementObject)[ATTRIBUTE_GROUP_KEY] as AttributesObject;
  const elementWithoutAttributes = _omit(element, ATTRIBUTE_GROUP_KEY) as Element;
  const [[tagKey, subElements]] = Object.entries(elementWithoutAttributes);
  const type = getTagType(tagKey);
  return { attributes, tagKey, subElements, type };
}

export default function Elements(props: ElementsProps) {
  const { elements, level = 0, isText = true } = props;
  const { indentSize } = useContext(XMLViewerContext);

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
                text={subElements as string}
                indentation={indentation}
                hasSiblings={hasSiblings}
                isText={isText}
              />
            );
          case ATTRIBUTE_COMMENT:
            return (
              <CommentTag key={key} isInline={isInline} indentation={indentation}>
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
            return <DeclarationTag key={key} indentation={indentation} tagKey={tagKey} attributes={attributes} />;
          default:
            return (
              <Tag
                key={key}
                indentation={indentation}
                tagKey={tagKey}
                attributes={attributes}
                isInline={isInline}
                hasChildren={subElements.length > 0}
              >
                <Elements elements={subElements as Element[]} level={level + 1} />
              </Tag>
            );
        }
      })}
    </>
  );
}

export interface TextElementProps {
  text: string;
  hasSiblings: boolean;
  indentation: string;
  isText: boolean;
}

function TextElement(props: TextElementProps) {
  const { hasSiblings, text, indentation, isText } = props;
  const { theme } = useContext(XMLViewerContext);
  const style = isText ? { color: theme.textColor } : undefined;

  return hasBreakLines(text) || hasSiblings ? (
    <div style={style}>
      {text
        .split("\n")
        .filter((element) => !!element.trim())
        .map((line, index) => (
          <div key={`${index}`}>{`${indentation}${line.trim()}`}</div>
        ))}
    </div>
  ) : (
    <span style={style}>{text}</span>
  );
}

export interface CommentTagProps {
  indentation: string;
  children: ReactNode;
  isInline: boolean;
}

function CommentTag(props: CommentTagProps) {
  const { indentation, children, isInline } = props;
  const { theme } = useContext(XMLViewerContext);
  const { collapsed, buttonProps } = useCollapsible();

  return (
    <div style={{ color: theme.commentColor }}>
      <span {...buttonProps}>
        <span>{indentation}</span>
        <CollapseIcon collapsed={collapsed} />
        <span>{"<!-- "}</span>
      </span>
      {!collapsed && children}
      {collapsed && "..."}
      <span>{`${isInline || collapsed ? " " : indentation}-->`}</span>
    </div>
  );
}

export interface CDataTagProps {
  indentation: string;
  children: ReactNode;
  isInline: boolean;
}

function CDataTag(props: CDataTagProps) {
  const { indentation, children, isInline } = props;
  const { theme } = useContext(XMLViewerContext);

  return (
    <div style={{ color: theme.cdataColor }}>
      <span>{`${indentation}<![CDATA[`}</span>
      {children}
      <span>{`${isInline ? "" : indentation}]]>`}</span>
    </div>
  );
}

export interface DeclarationTagProps {
  indentation: string;
  tagKey: string;
  attributes: AttributesObject;
}

function DeclarationTag(props: DeclarationTagProps) {
  const { indentation, tagKey, attributes } = props;
  const { theme } = useContext(XMLViewerContext);

  return (
    <div>
      <span style={{ color: theme.separatorColor }}>{`${indentation}<?`}</span>
      <span style={{ color: theme.tagColor }}>{`${tagKey.slice(1)}`}</span>
      <Attributes attributes={attributes} />
      <span style={{ color: theme.separatorColor }}>{"?>"}</span>
    </div>
  );
}

export interface TagProps {
  indentation: string;
  tagKey: string;
  attributes: AttributesObject;
  children: ReactNode;
  isInline: boolean;
  hasChildren: boolean;
}

function hasAttributes(attributes: AttributesObject) {
  if (!attributes) {
    return false;
  }

  return Object.keys(attributes).length > 0;
}

function Tag(props: TagProps) {
  const { indentation, tagKey, attributes, children, isInline, hasChildren } = props;
  const { collapsed, buttonProps } = useCollapsible();
  const { theme } = useContext(XMLViewerContext);

  return (
    <div>
      <span {...buttonProps}>
        <span>{indentation}</span>
        <CollapseIcon collapsed={collapsed} />
        <span style={{ color: theme.separatorColor }}>{"<"}</span>
        <span style={{ color: theme.tagColor }}>{`${tagKey}`}</span>
        {!collapsed && <Attributes attributes={attributes} />}
        {collapsed && hasAttributes(attributes) && " ..."}
        <span style={{ color: theme.separatorColor }}>{!hasChildren ? " />" : ">"}</span>
      </span>
      {hasChildren && (
        <>
          {!collapsed && children}
          {collapsed && "..."}
          <span style={{ color: theme.separatorColor }}>{`${isInline || collapsed ? "" : indentation}</`}</span>
          <span style={{ color: theme.tagColor }}>{`${tagKey}`}</span>
          <span style={{ color: theme.separatorColor }}>{">"}</span>
        </>
      )}
    </div>
  );
}



