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
};

const XMLViewer = ({ xml, theme = {}, indentSize=defaultIndentSize }) => {
  let json = null;
  const customTheme = { ...defaultTheme, ...theme };

  try {
    json = convert.xml2js(xml, { compact: false, spaces: 0 });
  } catch (e) {
    return (<div>Invalid XML!</div>);
  }

  return (
    <div>
      {json.declaration && <DeclarationElement styles={customTheme} attributes={json.declaration.attributes} />}
      <Elements elements={json.elements} styles={customTheme} indentSize={indentSize} indentation="" />
    </div>
  );
}

XMLViewer.propTypes = {
    xml: PropTypes.string.isRequired,
    theme: PropTypes.object,
    indentSize: PropTypes.number,
}

export default XMLViewer;

