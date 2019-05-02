import React from 'react';

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
        <React.Fragment>
            <div style={{ paddingLeft: styles.elementPadding, whiteSpace: 'pre' }}>
                <span style={{ color: styles.separatorColor }}>{`${indentation}<`}</span>
                <span style={{ color: styles.tagColor }}>{name}</span>
                <Attributes attributes={attributes} styles={styles} />
                <span style={{ color: styles.separatorColor }}>{(elements ? '>' : '/>')}</span>
                {elements && <Elements elements={elements} styles={styles} indentation={indentation + getIndentationString(indentSize)} indentSize={indentSize} />}
                {elements && <span style={{ color: styles.separatorColor }}>{`${isTextElement(elements) ? "" : indentation}</`}</span>}
                {elements && <span style={{ color: styles.tagColor }}>{name}</span>}
                {elements && <span style={{ color: styles.separatorColor }}>{">"}</span>}
            </div>
        </React.Fragment>
    );
}

const getElement = (styles, indentation, indentSize) => element => {
    switch (element.type) {
        case "text":
            return <TextElement text={element.text} styles={styles} />;
        case "element":
            return <Element name={element.name} elements={element.elements} attributes={element.attributes} styles={styles} indentation={indentation} indentSize={indentSize} />
        case "comment":
            return <CommentElement comment={element.comment} styles={styles} indentation={indentation} />;
        case "cdata":
            return <CdataElement cdata={element.cdata} styles={styles} indentation={indentation} />;
        case "instruction":
            return <InstructionElement instruction={element.instruction} name={element.name} styles={styles} indentation={indentation} />;
        default:
            return null;
    }
}

const Elements = ({ elements, styles, indentation, indentSize }) => {
    return elements.map(getElement(styles, indentation, indentSize));
}

export default Elements;