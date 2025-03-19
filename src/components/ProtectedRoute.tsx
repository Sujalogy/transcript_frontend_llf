// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode, useState, useEffect } from 'react';
import { selectAuth, selectAuthLoading, selectIsAuthenticated, selectUser } from '@/redux/authSlice';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isChecking = useSelector(selectAuthLoading);
    const location = useLocation();



    if (isChecking) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                <p className="ml-3 text-gray-600">Checking authentication...</p>
            </div>
        );
    }

    if (!isAuthenticated && !isChecking) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};