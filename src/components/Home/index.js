import React from 'react';
import {withAuthorization} from '../Session';

const HomePage = () => {
    return (
        <div>
           <h1>Home Page</h1>
           <p>The home page is accessible by every signin users</p>
        </div>
    )
}

const condition = authUser => authUser != null;

export default withAuthorization(condition)(HomePage);
