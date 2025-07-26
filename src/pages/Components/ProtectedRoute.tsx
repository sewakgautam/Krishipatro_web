// components/ProtectedRoute.tsx
"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Wheat } from 'lucide-react';
import { useAuth } from '@/contexts/firebaseauthcontext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireComplete?: boolean; // Require complete profile (name exists)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireComplete = false 
}) => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to login
        router.push('/login');
        return;
      }

      if (requireComplete && (!userData || !userData.userName)) {
        // User exists but profile incomplete, redirect to complete profile
        router.push('/login');
        return;
      }
    }
  }, [user, userData, loading, router, requireComplete]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-600 rounded-full p-4 mx-auto mb-4 animate-pulse">
            <Wheat className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!user || (requireComplete && (!userData || !userData.userName))) {
    return null;
  }

  // User is authenticated and profile is complete (if required)
  return <>{children}</>;
};

export default ProtectedRoute;
