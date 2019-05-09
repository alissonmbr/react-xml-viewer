import React from 'react';
import Attributes from './attributes';
import PropTypes from 'prop-types';

const DeclarationElement = ({ attributes, theme }) => {
    return (
        <div>
            <span style={{ color: theme.separatorColor }}>{`<?`}</span>
            <span style={{ color: theme.tagColor }}>{"xml"}</span>
            <Attributes attributes={attributes} theme={theme} />
            <span style={{ color: theme.separatorColor }}>{`?>`}</span>
        </div>
    );
}

DeclarationElement.propTypes = {
    attributes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default DeclarationElement;