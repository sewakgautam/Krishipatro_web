import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/firebaseauthcontext';

export const useRequireAuth = (requireComplete = true) => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (requireComplete && (!userData || !userData.userName)) {
        router.push('/complete-profile');
        return;
      }
    }
  }, [user, userData, loading, router, requireComplete]);

  return { user, userData, loading, isAuthenticated: !!user };
};
