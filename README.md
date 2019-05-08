# react-xml-viewer

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

## License

MIT © [alissonmbr](https://github.com/alissonmbr)
