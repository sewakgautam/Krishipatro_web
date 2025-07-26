import { User } from 'firebase/auth';

export const getUserDisplayName = (user: User | null, userData: any) => {
  if (userData?.userName) return userData.userName;
  if (user?.displayName) return user.displayName;
  return 'User';
};

export const isProfileComplete = (userData: any) => {
  return userData && userData.userName && userData.userName.trim() !== '';
};

export const getAuthRedirectPath = (user: User | null, userData: any) => {
  if (!user) return '/login';
  if (!isProfileComplete(userData)) return '/complete-profile';
  return '/dashboard';
};
