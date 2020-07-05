import React from 'react';
import convert from 'xml-js';
import PropTypes from 'prop-types';

import DeclarationElement from './declaration-el';
import Elements from './elements';

const defaultIndentSize = 2;
const defaultTheme = {
  tagColor: '#d43900',
  textColor: '#333',
  attributeKeyColor: '#2a7ab0',
  attributeValueColor: '#008000',
  separatorColor: '#333',
  commentColor: '#aaa',
  cdataColor: '#1d781d',
  overflowBreak: false,
};

const defaultInvalidXml = (<div>Invalid XML!</div>);

const XMLViewer = ({ xml, theme, indentSize, invalidXml, ...props }) => {
  let json = null;
  const customTheme = { ...defaultTheme, ...theme };

  try {
    json = convert.xml2js(xml, { compact: false, spaces: 0 });
    if (!Array.isArray(json.elements)) {
      return invalidXml;
    }
  } catch (e) {
    return invalidXml;
  }

  return (
    <div {...props}>
      {json.declaration && <DeclarationElement theme={customTheme} attributes={json.declaration.attributes} />}
      <Elements elements={json.elements} theme={customTheme} indentSize={indentSize} indentation="" />
    </div>
  );
}

XMLViewer.propTypes = {
    xml: PropTypes.string.isRequired,
    theme: PropTypes.object,
    indentSize: PropTypes.number,
    invalidXml: PropTypes.node,
}

XMLViewer.defaultProps = {
  theme: {},
  indentSize: 2,
  invalidXml: defaultInvalidXml,
}

export default XMLViewer;

