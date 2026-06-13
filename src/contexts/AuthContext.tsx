import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth';

// Simplified User interface
export interface User {
  id: string;
  email?: string;
  user_metadata?: any;
}

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  email: string | null;
  affiliate_status: 'none' | 'pending' | 'active' | 'rejected';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (newProfile: Partial<Profile>) => void;
  isAdmin: boolean;
  signIn: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...newProfile } : null);
  };

  const signIn = (newUser: User) => {
    setUser(newUser);
    setProfile({
      id: newUser.id,
      role: newUser.email === 'ariyantomhd88@gmail.com' ? 'admin' : 'user',
      email: newUser.email || null,
      username: newUser.email?.split('@')[0] || null,
      full_name: null,
      avatar_url: null,
      affiliate_status: 'none'
    });
  };

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const result = await authService.loadCurrentUser();
        if (result.data && mounted) {
           signIn(result.data as any);
        } else if (mounted) {
           // Fallback: Check local storage for demo user
           const savedUser = localStorage.getItem('demo_user');
           if (savedUser) {
             const parsedUser = JSON.parse(savedUser);
             signIn(parsedUser);
           }
        }
      } catch (e) {
        console.warn("Could not fetch user via API");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUser();
    return () => { mounted = false; };
  }, []);

  const signOut = async () => {
    try {
      await authService.logoutUser().catch(console.error);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signOut,
    updateProfile,
    isAdmin: profile?.role === 'admin' || user?.email === 'ariyantomhd88@gmail.com',
    signIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
