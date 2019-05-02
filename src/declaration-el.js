import React from 'react';
import Attributes from './attributes';

const DeclarationElement = ({ attributes, styles }) => {
    return (
        <div>
            <span style={{ color: styles.separatorColor }}>{`<?`}</span>
            <span style={{ color: styles.tagColor }}>{"xml"}</span>
            <Attributes attributes={attributes} styles={styles} />
            <span style={{ color: styles.separatorColor }}>{`?>`}</span>
        </div>
    );
}

export default DeclarationElement;