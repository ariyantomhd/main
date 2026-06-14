'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth';
import type { UserWithToken } from '../types/marketplace';

export interface Profile {
  id: string;
  email: string;
  username: string | null;
  name: string | null; 
  avatar_url: string | null;
  role: 'user' | 'admin';
  balance: number;
  affiliate_status: 'none' | 'pending' | 'active' | 'rejected';
}

interface AuthContextType {
  user: UserWithToken | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (newProfile: Partial<Profile>) => void;
  isAdmin: boolean;
  signIn: (userData: UserWithToken) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithToken | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...newProfile } : null);
  };

  const signIn = (userData: UserWithToken) => {
    setUser(userData);
    setProfile({
      id: userData.id,
      email: userData.email,
      username: userData.username || userData.email.split('@')[0] || 'user',
      name: userData.name || null,
      avatar_url: userData.avatar_url || null,
      role: userData.role === 'admin' ? 'admin' : 'user',
      balance: userData.balance || 0,
      affiliate_status: userData.affiliate_status || 'none',
    });
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      // Lazy Load: Hanya cek ke API jika ada data di localStorage
      const savedUser = localStorage.getItem('demo_user');
      
      if (!savedUser) {
        setLoading(false);
        return;
      }

      try {
        const result = await authService.loadCurrentUser();
        
        if (result.success && result.data && mounted) {
          signIn(result.data);
        } else {
          // Jika token tidak valid/expired, bersihkan storage
          localStorage.removeItem('demo_user');
        }
      } catch (e) {
        console.warn("Auth sync failed, user remains unauthenticated.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();
    return () => { mounted = false; };
  }, []);

  const signOut = async () => {
    try {
      await authService.logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setProfile(null);
      localStorage.removeItem('demo_user');
    }
  };

  const value = {
    user,
    profile,
    loading,
    signOut,
    updateProfile,
    isAdmin: profile?.role === 'admin',
    signIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}