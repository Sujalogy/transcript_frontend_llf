
// src/components/PublicRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { selectIsAuthenticated } from '@/redux/authSlice';

interface PublicRouteProps {
    children: ReactNode;
    restricted?: boolean;
}

export const PublicRoute = ({ children, restricted = false }: PublicRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // If route is restricted and user is logged in, redirect to home
    if (restricted && isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
};