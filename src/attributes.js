import React from 'react';

const Attributes = ({ attributes, styles }) => {
    let attributeList = [];

    for (const key in attributes) {
        attributeList.push(
            <React.Fragment>
                <span>
                    <span style={{ color: styles.attributeKeyColor }}>{` ${key}`}</span>
                    <span style={{ color: styles.separatorColor }}>{"="}</span>
                    <span style={{ color: styles.attributeValueColor }}>{`"${attributes[key]}"`}</span>
                </span>
            </React.Fragment>
        );
    }

    return attributeList;
}


export default Attributes;