[Buy me a coffee ☕](https://www.buymeacoffee.com/alissonmbr)


# react-xml-viewer
[![NPM](https://img.shields.io/npm/v/react-xml-viewer.svg)](https://www.npmjs.com/package/react-xml-viewer)\
Simple and configurable React component to prettify XMLs.



<img src="https://raw.githubusercontent.com/alissonmbr/react-xml-viewer/example.png" width="300"/>

## Live demo
[![Edit react-xml-view](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-xml-viewer-v2-example-6xh9yq)


## Install

#### npm
```bash
npm install --save react-xml-viewer
```

#### yarn
```bash
yarn add react-xml-viewer
```

## Usage

```jsx
import React, { Component } from 'react'
import XMLViewer from 'react-xml-viewer'

const xml = '<hello>World</hello>'

export function App() {
    return (
      <div>
        <XMLViewer xml={xml} />
      </div>
    )
}
```

## Props
### xml (string)
A xml string to prettify.\
**Default**: undefined\
**Example**: `<hello>World</hello>`

### indentSize (number)
The size of the indentation.\
**Default**: 2

### invalidXml (JSX.Element)
When the xml is invalid, invalidXml component will be returned.\
**Default**: `<div>Invalid XML!</div>`

### collapsible (boolean)
Allow collapse/expand tags by click on them. When tag is collapsed its content and attributes are hidden.\
**Default**: false

### initalCollapsedDepth (number)
When the **collapsible** is true, this set the level that will be started as collapsed. For example, if you want to everything starts as collapsed, set 0.\
**Default**: undefined

### theme (object)
An object to customize the default theme.

| Key | Type | Default | Description |
| --- | ---- | ------- | ----------- |
| attributeKeyColor | color | #2a7ab0 | Set the attribute key color (`<tag attribute-key="hello" />`) |
| attributeValueColor | color | #008000 | Set the attribute value color (` <tag attr="Attribute value">`) |
| cdataColor | color | #1D781D | Set the cdata element color (`<![CDATA[some stuff]]>`) |
| commentColor | color | #aaa | Set the comment color (`<!-- this is a comment -->`)
| fontFamily | font | monospace | Set the font family
| separatorColor | color | #333 | Set the separators colors (`<, >, </, />, =, <?, ?>`)
| tagColor | color | #d43900 | Set the tag name color (`<tag-name />`) |
| textColor | color | #333 | Set the text color (`<tag>Text</tag>`)|

**Example**:
Changing attribute key and value color
``` jsx
import React, { Component } from 'react'
import XMLViewer from 'react-xml-viewer'

const xml = '<hello attr="World" />'
const customTheme = {
  "attributeKeyColor": "#FF0000",
  "attributeValueColor": "#000FF"
}

export function App() {
  return (
    <div>
      <XMLViewer xml={xml} theme={customTheme} />
    </div>
  )
}
```

## License

MIT © [alissonmbr](https://github.com/alissonmbr)
