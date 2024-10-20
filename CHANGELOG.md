## 2.0.3
_Oct 20, 2024_

- fix: xml validation
- chore: added source map
- chore: updated `fast-xml-parser` to 4.5.0

## 2.0.2

_Oct 14, 2024_

- fix: exported types on package.json

## 2.0.1

_Oct 25, 2023_

- fix: set main to the umd file
- fix: wrong link to the example image

## 2.0.0

_Jun 22, 2023_

- Code rewrited in typescript.
- Changed the xml parser from `xml-js` to `fast-xml-parser`, fixing the compatibility with webpack 5.
- Added the `initalCollapsedDepth` prop that allow to start the xml collapsed at the level passed as prop.
- Compatibility with react 18.
- Removed the theme prop `overflowBreak`, now the overflow break is default