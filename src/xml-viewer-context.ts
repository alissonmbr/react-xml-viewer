import { createContext, useContext } from "react";
import { XmlViewerContext } from "./types";
import { defaultTheme } from "./contants";

const defaultState: XmlViewerContext = {
  theme: defaultTheme,
  collapsible: false,
  indentSize: 2
};

export const XMLViewerContext = createContext<XmlViewerContext>(defaultState);
export const useXMLViewerContext = () => useContext(XMLViewerContext);
