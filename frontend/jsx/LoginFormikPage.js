import React from 'react';
import ReactDOM from 'react-dom';

import LoginFormikWrapper from './apps/login/LoginFormikWrapper';

const params = new URLSearchParams(window.location.search);

ReactDOM.render(<LoginFormikWrapper
        error={params.get('error')}
        logout={params.get('logout')}
        action={'/perform_login'}/>,
    document.getElementById('root')
);