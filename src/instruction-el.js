import React from 'react';
import PropTypes from 'prop-types';

const InstructionElement = ({ name, instruction, styles, indentation }) => {
    return (
        <div>
            <span style={{ color: styles.separatorColor }}>{`${indentation}<?`}</span>
            <span style={{ color: styles.tagColor }}>{name}</span>
            <span style={{ color: styles.attributeKeyColor }}>{` ${instruction}`}</span>
            <span style={{ color: styles.separatorColor }}>{`?>`}</span>
        </div>);
}

InstructionElement.propTypes = {
    name: PropTypes.string.isRequired,
    instruction: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
}

export default InstructionElement;