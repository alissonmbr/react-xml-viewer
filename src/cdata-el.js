import React from 'react';
import PropTypes from 'prop-types';

const CdataElement = ({ cdata, theme, indentation }) => {
    return (
        <div style={{ color: theme.cdataColor }}>
            {`${indentation}<![CDATA[${cdata}]]>`}
        </div>
    );
}

CdataElement.propTypes = {
    cdata: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
}

export default CdataElement;