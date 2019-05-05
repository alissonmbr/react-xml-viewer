import React from 'react';
import PropTypes from 'prop-types';

const CdataElement = ({ cdata, styles, indentation }) => {
    return (
        <div style={{ color: styles.cdataColor }}>
            {`${indentation}<![CDATA[${cdata}]]>`}
        </div>
    );
}

CdataElement.propTypes = {
    cdata: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
}

export default CdataElement;