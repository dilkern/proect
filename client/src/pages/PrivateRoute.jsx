import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
	const token = localStorage.getItem('accessToken');
	const decodedToken = token ? jwtDecode(token) : null;
	const isAdmin = decodedToken?.roles?.includes('ADMIN');

	if (!token || !isAdmin) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default PrivateRoute;
