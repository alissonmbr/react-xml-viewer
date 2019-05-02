import React from 'react';
import convert from 'xml-js';
import defaultStyles from './styles';

import DeclarationElement from './declaration-el';
import Elements from './elements';

const indentSize = 2;


const XML = ({ xml, styles = {} }) => {
  const json = convert.xml2js(xml, { compact: false, spaces: 0 });
  const customStyles = { ...defaultStyles, ...styles };

  return (
    <div>
      {json.declaration && <DeclarationElement styles={customStyles} attributes={json.declaration.attributes} />}
      <Elements elements={json.elements} styles={customStyles} indentSize={indentSize} indentation="" />
    </div>
  );
}

export default XML;
