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

const Element = ({ name, elements, attributes, theme, indentation, indentSize }) => {
    return (
        <div style={{ whiteSpace: 'pre' }}>
            <span style={{ color: theme.separatorColor }}>{`${indentation}<`}</span>
            <span style={{ color: theme.tagColor }}>{name}</span>
            <Attributes attributes={attributes} theme={theme} />
            <span style={{ color: theme.separatorColor }}>{(elements ? '>' : '/>')}</span>
            {elements && <Elements elements={elements} theme={theme} indentation={indentation + getIndentationString(indentSize)} indentSize={indentSize} />}
            {elements && <span style={{ color: theme.separatorColor }}>{`${isTextElement(elements) ? "" : indentation}</`}</span>}
            {elements && <span style={{ color: theme.tagColor }}>{name}</span>}
            {elements && <span style={{ color: theme.separatorColor }}>{">"}</span>}
        </div>
    );
}

Element.propTypes = {
    name: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(PropTypes.object),
    attributes: PropTypes.object,
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
    indentSize: PropTypes.number.isRequired,
}

const getElement = (theme, indentation, indentSize) => (element, index) => {
    switch (element.type) {
        case "text":
            return <TextElement key={`el-${index}`} text={element.text} theme={theme} />;
        case "element":
            return <Element key={`el-${index}`} name={element.name} elements={element.elements} attributes={element.attributes} theme={theme} indentation={indentation} indentSize={indentSize} />
        case "comment":
            return <CommentElement key={`el-${index}`} comment={element.comment} theme={theme} indentation={indentation} />;
        case "cdata":
            return <CdataElement key={`el-${index}`} cdata={element.cdata} theme={theme} indentation={indentation} />;
        case "instruction":
            return <InstructionElement key={`el-${index}`} instruction={element.instruction} name={element.name} theme={theme} indentation={indentation} />;
        default:
            return null;
    }
}

const Elements = ({ elements, theme, indentation, indentSize }) => {
    return elements.map(getElement(theme, indentation, indentSize));
}

Elements.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
    indentSize: PropTypes.number.isRequired,
}

export default Elements;