import React from 'react';

const InstructionElement = ({ name, instruction, styles, indentation }) => {
    return (
        <div>
            <span style={{ color: styles.separatorColor }}>{`${indentation}<?`}</span>
            <span style={{ color: styles.tagColor }}>{name}</span>
            <span style={{ color: styles.attributeKeyColor }}>{` ${instruction}`}</span>
            <span style={{ color: styles.separatorColor }}>{`?>`}</span>
        </div>);
}

export default InstructionElement;