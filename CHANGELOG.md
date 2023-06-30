## 2.0.0

_Jun 22, 2023_

- Code rewrited in typescript.
- Changed the xml parser from `xml-js` to `fast-xml-parser`, fixing the compatibility with webpack 5.
- Added the `initalCollapsedDepth` prop that allow to start the xml collapsed at the level passed as prop.
- Compatibility with react 18.
- Removed the theme prop `overflowBreak`, now the overflow break is default