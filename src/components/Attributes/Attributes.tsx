import React, { useContext } from "react";
import { XMLViewerContext } from "../../xml-viewer-context";
import { AttributesProps } from "./types";

export default function Attributes(props: AttributesProps) {
  const { attributes } = props;
  const { theme } = useContext(XMLViewerContext);

  if (!attributes) {
    return null;
  }

  return (
    <span className="rxv-attributes">
      {Object.entries(attributes).map(([key, value]) => (
        <span key={`attribute-${key}`}>
          <span style={{ color: theme.attributeKeyColor }}>{` ${key}`}</span>
          <span style={{ color: theme.separatorColor }}>=</span>
          <span style={{ color: theme.attributeValueColor }}>{`"${value}"`}</span>
        </span>
      ))}
    </span>
  );
}
