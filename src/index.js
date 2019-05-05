import React from 'react';
import convert from 'xml-js';
import PropTypes from 'prop-types';

import DeclarationElement from './declaration-el';
import Elements from './elements';

const defaultIndentSize = 2;
const defaultStyles = {
  tagColor: '#d43900',
  textColor: '#333',
  attributeKeyColor: '#2a7ab0',
  attributeValueColor: '#008000',
  elementPadding: '0px',
  separatorColor: '#333',
  commentColor: '#aaa',
  cdataColor: '#1D781D',
};

const XMLViewer = ({ xml, styles = {}, indentSize=defaultIndentSize }) => {
  let json = null;
  const customStyles = { ...defaultStyles, ...styles };

  try {
    json = convert.xml2js(xml, { compact: false, spaces: 0 });
  } catch (e) {
    return (<div>Invalid XML!</div>);
  }

  return (
    <div>
      {json.declaration && <DeclarationElement styles={customStyles} attributes={json.declaration.attributes} />}
      <Elements elements={json.elements} styles={customStyles} indentSize={indentSize} indentation="" />
    </div>
  );
}

XMLViewer.propTypes = {
    xml: PropTypes.string.isRequired,
    styles: PropTypes.object,
    indentSize: PropTypes.number,
}

export default XMLViewer;

