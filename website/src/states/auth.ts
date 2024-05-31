import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface AuthState {
  address: string[] | null;
  setAddress: (address: string[]) => void;
  removeAddress: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
      persist(
        (set) => ({
          address: null,
          setAddress: (address) => set((state) => ({ address })),
          removeAddress: () => set((state) => ({ address: null })),
        }),
        {
          name: 'auth-storage',
        },
      ),
    ),
  )