import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function ProtectedRoute({ children, isAuthenticated, isLoading }: ProtectedRouteProps) {
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-2xl text-[#3A3A3A]">Chargement...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
}
