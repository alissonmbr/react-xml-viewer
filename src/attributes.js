import React from 'react';
import PropTypes from 'prop-types';

const Attributes = ({ attributes, styles }) => {
    let attributeList = [];

    for (const key in attributes) {
        attributeList.push(
            <span key={`attr-${key}[${attributes[key]}]`}>
                <span style={{ color: styles.attributeKeyColor }}>{` ${key}`}</span>
                <span style={{ color: styles.separatorColor }}>{"="}</span>
                <span style={{ color: styles.attributeValueColor }}>{`"${attributes[key]}"`}</span>
            </span>
        );
    }

    return attributeList;
}

Attributes.propTypes = {
    attributes: PropTypes.object,
    styles: PropTypes.object.isRequired,
};


export default Attributes;