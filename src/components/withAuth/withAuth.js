import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (ComponentToProtect) => {
  return (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const checkToken = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/check-token`,
            {
              method: 'GET',
              credentials: 'include', // include, *same-origin, omit
            }
          );

          if (response.status === 401) {
            // Token is missing or expired, user is not authenticated
            navigate('/login');
          } else if (response.ok) {
            // Token is valid, user is authenticated
            setLoading(false);
          } else {
            // Other error status, handle it accordingly
            console.log('Error:', response.statusText);
            // Handle the error case, such as displaying an error message
          }
        } catch (error) {
          console.error('Error:', error.message);
          // Handle the error case, such as displaying an error message
        }
      };
      
      checkToken();
    }, [navigate]);

    return (
      loading ? <div>Loading...</div> : <ComponentToProtect {...props} />
    );
  };
};

export default withAuth;
