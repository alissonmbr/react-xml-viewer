import { createContext } from "react";
import { XmlViewerContext } from "./types";

const defaultState = {}

export const XMLViewerContext = createContext<XmlViewerContext>({});
