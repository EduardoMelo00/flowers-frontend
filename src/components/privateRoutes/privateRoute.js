import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    if (!token) {
        navigate('/login');
        return null;
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
}

export default PrivateRoute;
