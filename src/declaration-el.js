import React from 'react';
import Attributes from './attributes';
import PropTypes from 'prop-types';

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

DeclarationElement.propTypes = {
    attributes: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
}

export default DeclarationElement;