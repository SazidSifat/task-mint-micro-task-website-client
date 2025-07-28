import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        <Navigate state={location.pathname} to='/login' />
    }
    return children
};

export default PrivateRoute;