import { useMemo } from "react";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  preserveOrder: true
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
