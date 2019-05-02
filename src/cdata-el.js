import React from 'react';

const CdataElement = ({ cdata, styles, indentation }) => {
    return (
        <div style={{ color: styles.cdataColor }}>
            {`${indentation}<![CDATA[${cdata}]]>`}
        </div>
    );
}

export default CdataElement;