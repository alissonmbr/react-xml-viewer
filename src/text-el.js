import React from 'react';
import PropTypes from 'prop-types';

const TextElement = ({ text, theme }) => {
    return (
        <span style={{ color: theme.textColor }}>
            {text}
        </span>
    );
}

TextElement.propTypes = {
    text: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
}

export default TextElement;