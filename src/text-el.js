import React from 'react';
import PropTypes from 'prop-types';

const TextElement = ({ text, theme }) => {
    const overflow = theme.overflowBreak ? { overflowWrap: 'break-word', whiteSpace: 'normal' } : {} 
    return (
        <span style={{ color: theme.textColor,  ...overflow }}>
            {text}
        </span>
    );
}

TextElement.propTypes = {
    text: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
}

export default TextElement;