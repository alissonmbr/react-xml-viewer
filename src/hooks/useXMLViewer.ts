import { useMemo } from "react";
import { XMLParser } from "fast-xml-parser";
import { ATTRIBUTE_CDATA, ATTRIBUTE_COMMENT } from "../contants";

const parser = new XMLParser({
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  allowBooleanAttributes: true,
  commentPropName: ATTRIBUTE_COMMENT,
  cdataPropName: ATTRIBUTE_CDATA,
  parseTagValue: false,
});

export default function useXMLViewer(xml: string) {
  return useMemo(() => {
    try {
      const json = parser.parse(xml);
      return { json, valid: true };
    } catch (e) {
      return { json: null, valid: false, errorMessage: e.message };
    }
  }, [xml]);
}
