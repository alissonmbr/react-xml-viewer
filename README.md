# react-xml-viewer
Simple and configurable React component to prettify XMLs.
> 

[![NPM](https://img.shields.io/npm/v/react-xml-viewer.svg)](https://www.npmjs.com/package/react-xml-viewer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-xml-viewer
```

## Usage

```jsx
import React, { Component } from 'react'
import XMLViewer from 'react-xml-viewer'

const xml = '<hello>World</hello>'

export default class App extends Component {
  render () {
    return (
      <div>
        <XMLViewer xml={xml} />
      </div>
    )
  }
}
```

## Props
### xml (string)
A xml string to prettify. 
**Default**: undefined
**Example**: `<hello>World</hello>`

### indentSize (number)
The size of the indentation.
**Default**: 2

### theme (object)

| Key | Type | Default | Description |
| --- | ---- | ------- | ----------- |
| attributeKeyColor | color | #2a7ab0 | set the attribute key color (`<tag attribute-key="hello" />`) |
| attributeValueColor | color | #008000 | set the attribute value color (` <tag attr="Attribute value">`) |
| cdataColor | color | #1D781D | set the cdata element color (`<![CDATA[some stuff]]>`) |
| commentColor | color | #aaa | set the comment color (`<!-- this is a comment -->`)
| separatorColor | color | #333 | set the separators colors (`<, >, </, />, =, <?, ?>`)
| tagColor | color | #d43900 | set the tag name color (`<tag-name />`) |
| textColor | color | #333 | set the text color (`<tag>Text</tag>`)|

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

export default class App extends Component {
  render () {
    return (
      <div>
        <XMLViewer xml={xml} theme={customTheme} />
      </div>
    )
  }
}
```
## License

MIT © [alissonmbr](https://github.com/alissonmbr)
