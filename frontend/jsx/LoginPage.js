import React from 'react';
import ReactDOM from 'react-dom';

import LoginWrapper from './apps/login/LoginWrapper';

const params = new URLSearchParams(window.location.search);

ReactDOM.render(<LoginWrapper
    error={params.get('error')}
    logout={params.get('logout')}
    action={'/perform_login'}/>,
    document.getElementById('root')
);