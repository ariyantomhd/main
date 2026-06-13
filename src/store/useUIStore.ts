import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  isJoinModalOpen: boolean;
  openJoinModal: () => void;
  closeJoinModal: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isJoinModalOpen: false,
      openJoinModal: () => set({ isJoinModalOpen: true }),
      closeJoinModal: () => set({ isJoinModalOpen: false }),
      theme: 'dark', // default theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }), // Only persist theme
    }
  )
);

