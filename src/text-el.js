import React from 'react';
import PropTypes from 'prop-types';

const TextElement = ({ text, styles }) => {
    return (
        <span style={{ color: styles.textColor }}>
            {text}
        </span>
    );
}

TextElement.propTypes = {
    text: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
}

export default TextElement;