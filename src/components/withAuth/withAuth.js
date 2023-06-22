// withAuth.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            fetch('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/checkToken', {
                method: 'GET',
                credentials: 'include',  // send cookies
            })
                .then(res => res.json())
                .then(data => {
                    setIsAuthenticated(data.message === 'Authenticated.');
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }, []);

        if (loading) {
            return <div>Loading...</div>;  // or your custom loading spinner
        }

        if (!isAuthenticated) {
            navigate('/login');  // or your login page path
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
