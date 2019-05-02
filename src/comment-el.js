import React from 'react';

const CommentElement = ({ comment, styles, indentation }) => {
    return (
        <div style={{ color: styles.commentColor }}>
            {`${indentation}<!-- ${comment} -->`}
        </div>
    );
}

export default CommentElement;