// src/providers/UserContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { authApi } from '@/services/authApi';
import type { User as UserType } from '@/types';

export type UserData = {
  id: string;
  isLoggedIn: boolean;
  username: string; // Diubah dari display_name agar selaras dengan types/index.ts
  email: string;
  avatar_url?: string | null;
  role?: string;
};

type UserContextType = {
  user: UserData;
  login: (userData: Omit<UserData, 'isLoggedIn'>, accessToken?: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: UserData = {
  id: '',
  isLoggedIn: false,
  username: '',
  email: '',
  avatar_url: null,
  role: 'BUYER',
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user_session');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {
          console.error('Failed to parse user session', e);
        }
      }
    }
    return defaultUser;
  });

  // Fungsi Login yang memastikan access_token tersimpan aman ke localStorage
  const login = (userData: Omit<UserData, 'isLoggedIn'>, accessToken?: string) => {
    const loggedInUser = { ...userData, isLoggedIn: true };
    setUser(loggedInUser);
    localStorage.setItem('user_session', JSON.stringify(loggedInUser));
    
    console.log('UserContext received accessToken:', accessToken);

    if (accessToken && typeof accessToken === 'string' && accessToken.trim() !== '') {
      localStorage.setItem('access_token', accessToken);
    } else {
      console.warn('Warning: login called without a valid accessToken!');
    }
  };

  // Fungsi Logout yang membersihkan sesi dan token backend
  const logout = async () => {
    try {
      const token = localStorage.getItem('access_token') || '';
      if (token) {
        await authApi.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      setUser(defaultUser);
      localStorage.removeItem('user_session');
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      localStorage.removeItem('jwt');
    }
  };

  // Fungsi untuk memvalidasi/mengambil data terbaru dari backend via authApi.me() tanpa parameter ID
  const refreshUser = async () => {
    if (!user.id) return;
    try {
      const response = await authApi.me();
      const responseData = response as unknown as { data?: UserType };
      const freshData = responseData?.data || (response as unknown as UserType);

      if (freshData && freshData.id) {
        const updatedUser: UserData = {
          id: freshData.id,
          isLoggedIn: true,
          username: freshData.username || '',
          email: freshData.email,
          avatar_url: freshData.avatar_url,
          role: freshData.role,
        };
        setUser(updatedUser);
        localStorage.setItem('user_session', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to refresh user session:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}