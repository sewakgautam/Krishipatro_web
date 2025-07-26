// contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseauth';

interface UserData {
  uid: string;
  userName?: string;
  phoneNumber?: string;
  email?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signOutUser: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signOutUser: async () => {},
  refreshUserData: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const refreshUserData = async () => {
    if (user) {
      const data = await fetchUserData(user.uid);
      setUserData(data);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        
        // Fetch additional user data from Firestore
        const userData = await fetchUserData(user.uid);
        setUserData(userData);
      } else {
        // User is signed out
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userData,
    loading,
    signOutUser,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
