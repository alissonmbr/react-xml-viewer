import React from 'react';
import PropTypes from 'prop-types';

import Attributes from './attributes';
import CdataElement from './cdata-el';
import CommentElement from './comment-el';
import InstructionElement from './instruction-el';
import TextElement from './text-el';

function getIndentationString(size) {
    return new Array(size + 1).join(" ");
}

function isTextElement(elements) {
    return elements.length === 1 && elements[0].type === "text";
}

const Element = ({ name, elements, attributes, styles, indentation, indentSize }) => {
    return (
        <div style={{ whiteSpace: 'pre' }}>
            <span style={{ color: styles.separatorColor }}>{`${indentation}<`}</span>
            <span style={{ color: styles.tagColor }}>{name}</span>
            <Attributes attributes={attributes} styles={styles} />
            <span style={{ color: styles.separatorColor }}>{(elements ? '>' : '/>')}</span>
            {elements && <Elements elements={elements} styles={styles} indentation={indentation + getIndentationString(indentSize)} indentSize={indentSize} />}
            {elements && <span style={{ color: styles.separatorColor }}>{`${isTextElement(elements) ? "" : indentation}</`}</span>}
            {elements && <span style={{ color: styles.tagColor }}>{name}</span>}
            {elements && <span style={{ color: styles.separatorColor }}>{">"}</span>}
        </div>
    );
}

Element.propTypes = {
    name: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(PropTypes.object),
    attributes: PropTypes.object,
    styles: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
    indentSize: PropTypes.number.isRequired,
}

const getElement = (styles, indentation, indentSize) => (element, index) => {
    switch (element.type) {
        case "text":
            return <TextElement key={`el-${index}`} text={element.text} styles={styles} />;
        case "element":
            return <Element key={`el-${index}`} name={element.name} elements={element.elements} attributes={element.attributes} styles={styles} indentation={indentation} indentSize={indentSize} />
        case "comment":
            return <CommentElement key={`el-${index}`} comment={element.comment} styles={styles} indentation={indentation} />;
        case "cdata":
            return <CdataElement key={`el-${index}`} cdata={element.cdata} styles={styles} indentation={indentation} />;
        case "instruction":
            return <InstructionElement key={`el-${index}`} instruction={element.instruction} name={element.name} styles={styles} indentation={indentation} />;
        default:
            return null;
    }
}

const Elements = ({ elements, styles, indentation, indentSize }) => {
    return elements.map(getElement(styles, indentation, indentSize));
}

Elements.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.object),
    styles: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
    indentSize: PropTypes.number.isRequired,
}

export default Elements;