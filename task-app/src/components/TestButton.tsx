import React from 'react';
import { testCall } from '../services/TestCall';

function Button({name: Name}) {
    const handleClick = async () => {
        const response = await testCall();

        console.log(response.data);
    };
    return <button style ={{width: '200px'}} onClick={handleClick}>{Name}</button>;
}

export default Button;