import React from 'react';

const TestComp = ({name, age}) => {
    return <div>
        <span><strong>Name: </strong>{name}</span>{', '}<span><strong>Age: </strong>{age}</span>
    </div>
}

export default TestComp;