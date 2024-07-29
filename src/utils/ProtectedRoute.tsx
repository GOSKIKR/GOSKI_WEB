import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useLoginStore from '../store/loginStore';

interface ProtectedRouteProps {
    element: React.ReactElement;
    roles: string[];
    path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles, path }) => {
    const { role } = useLoginStore();

    return roles.includes(role) ? <Route path={path} element={element} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
