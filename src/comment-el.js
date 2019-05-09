import React from 'react';
import PropTypes from 'prop-types';

const CommentElement = ({ comment, theme, indentation }) => {
    return (
        <div style={{ color: theme.commentColor }}>
            {`${indentation}<!-- ${comment} -->`}
        </div>
    );
}

CommentElement.propTypes = {
    comment: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    indentation: PropTypes.string.isRequired,
}

export default CommentElement;