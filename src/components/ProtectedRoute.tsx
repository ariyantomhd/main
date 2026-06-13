import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUIStore } from '../store/useUIStore';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
}

export default function ProtectedRoute({ allowedRoles = ['user', 'admin'] }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const { openJoinModal } = useUIStore();
  const location = useLocation();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowWarning(true);
      openJoinModal();
    }
  }, [loading, user, openJoinModal]);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-accent border-t-transparent" />
        <p className="text-xs font-black uppercase tracking-widest text-app-secondary">
          Initializing...
        </p>
      </div>
    );
  }

  if (!user) {
    if (showWarning) {
      return (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-6 text-center animate-in fade-in duration-500">
          <div className="bg-app-surface border border-app-border p-8 rounded-2xl max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Akses Ditolak</h2>
            <p className="text-app-secondary mb-8">
              Silahkan login terlebih dahulu untuk mengakses halaman ini.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={openJoinModal}
                className="w-full bg-app-accent hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl transition-all"
              >
                Login Sekarang
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-app-bg border border-app-border hover:bg-app-surface text-white font-medium py-3 px-6 rounded-xl transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
