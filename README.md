[Buy me a coffee ☕](https://www.buymeacoffee.com/alissonmbr)

# react-xml-viewer

[![NPM](https://img.shields.io/npm/v/react-xml-viewer.svg)](https://www.npmjs.com/package/react-xml-viewer)\
Simple and configurable React component to prettify XMLs.

<img src="https://raw.githubusercontent.com/alissonmbr/react-xml-viewer/refs/heads/main/example.png" width="300"/>

## Live demo

[![Edit react-xml-view](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/react-xml-viewer-v2-example-6xh9yq?file=%2Fsrc%2Findex.js%3A15%2C9)

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
import React, { Component } from 'react';
import XMLViewer from 'react-xml-viewer';

const xml = '<hello>World</hello>';

export function App() {
  return (
    <div>
      <XMLViewer xml={xml} />
    </div>
  );
}
```

## Props

```tsx
<XMLViewer
  // A xml string to prettify.
  // Default: undefined
  xml="<hello>World</hello>"

  // The size of the indentation.
  // Default: 2
  indentSize={2}

  // When the xml is invalid, invalidXml component will be displayed.
  // Default: <div>Invalid XML!</div>
  invalidXml={<div>Invalid XML!</div>}

  // Enable collapsing or expanding tags by clicking on them.
  // Default: false
  collapsible={false}

  // When collapsible is true, this sets the level that will be started as collapsed.
  // Default: undefined
  initialCollapsedDepth={undefined}

  // Displays line numbers on the left side when set to true.
  // Default: false
  showLineNumbers={false}

  // An object to customize the theme.
  theme={{
    // Set the attribute key color (<tag attribute-key="hello" />)
    // Default: #2a7ab0
    attributeKeyColor: '#2a7ab0',

    // Set the attribute value color (<tag attr="Attribute value">)
    // Default: #008000
    attributeValueColor: '#008000',

    // Set the cdata element color (<![CDATA[some stuff]]>)
    // Default: #1D781D
    cdataColor: '#1D781D',

    // Set the comment color (<!-- this is a comment -->)
    // Default: #aaa
    commentColor: '#aaa',

    // Set the font family
    // Default: monospace
    fontFamily: 'monospace',

    // Set the separators colors (<, >, </, />, =, <?, ?>)
    // Default: #333
    separatorColor: '#333',

    // Set the tag name color (<tag-name />)
    // Default: #d43900
    tagColor: '#d43900',

    // Set the text color (<tag>Text</tag>)
    // Default: #333
    textColor: '#333',

    // Set the line numbers container background color
    // Default: #eee
    lineNumberBackground: '#eee',

    // Set the line numbers color
    // Default: #222
    lineNumberColor: '#222',
  }}
/>
```

**Example**:
Changing attribute key and value color

```jsx
import React, { Component } from 'react';
import XMLViewer from 'react-xml-viewer';

const xml = '<hello attr="World" />';
const customTheme = {
  attributeKeyColor: '#FF0000',
  attributeValueColor: '#000FF',
};

export function App() {
  return (
    <div>
      <XMLViewer xml={xml} theme={customTheme} />
    </div>
  );
}
```

## License

MIT © [alissonmbr](https://github.com/alissonmbr)

## Derived Projects

A list of open-source projects using react-xml-viewer:

- [panel-xml](https://github.com/awesome-panel/panel-xml): An XML widget for interactively exploring XML in Python notebooks and [Panel](https://panel.holoviz.org/reference/index.html) data apps.
