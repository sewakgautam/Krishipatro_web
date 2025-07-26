import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/firebaseauthcontext';

export const useAuthRedirect = () => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const currentPath = router.pathname;
      
      if (user) {
        // User is authenticated
        if (!userData?.name && currentPath !== '/complete-profile') {
          // Profile incomplete, redirect to complete profile
          router.push('/complete-profile');
        } else if (userData?.name && (currentPath === '/login' || currentPath === '/complete-profile')) {
          // Profile complete but on auth pages, redirect to dashboard
          router.push('/dashboard');
        }
      } else {
        // User not authenticated
        if (currentPath !== '/login' && currentPath !== '/') {
          router.push('/login');
        }
      }
    }
  }, [user, userData, loading, router]);

  return { user, userData, loading };
};
