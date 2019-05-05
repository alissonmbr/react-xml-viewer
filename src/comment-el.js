import React from 'react';
import PropTypes from 'prop-types';

const CommentElement = ({ comment, styles, indentation }) => {
    return (
        <div style={{ color: styles.commentColor }}>
            {`${indentation}<!-- ${comment} -->`}
        </div>
    );
}

CommentElement.propTypes = {
    comment: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
}

export default CommentElement;