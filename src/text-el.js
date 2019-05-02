import React from 'react';

const TextElement = ({ text, styles }) => {
    return (
        <span style={{ color: styles.textColor }}>
            {text}
        </span>
    );
}

export default TextElement;