import React from 'react';
import { testCall } from '../services/TestCall';

function Button() {
    const handleClick = async () => {
        const response = await testCall();

        console.log(response.data);
    };
    return <button onClick={handleClick}>Test API Call</button>;
}

export default Button;