import React from 'react';
import PropTypes from 'prop-types';

const InstructionElement = ({ name, instruction, theme, indentation }) => {
    return (
        <div>
            <span style={{ color: theme.separatorColor }}>{`${indentation}<?`}</span>
            <span style={{ color: theme.tagColor }}>{name}</span>
            <span style={{ color: theme.attributeKeyColor }}>{` ${instruction}`}</span>
            <span style={{ color: theme.separatorColor }}>{`?>`}</span>
        </div>);
}

InstructionElement.propTypes = {
    name: PropTypes.string.isRequired,
    instruction: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
}

export default InstructionElement;