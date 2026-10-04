import { create } from 'zustand';
import type { Person } from '../types';

interface AuthState {
    user: Person | null;
    setUser: (user: Person) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: {
        id: 'u1',
        name: 'Иванов И.И.',
        position: 'Руководитель группы',
        role: 'GROUP_HEAD',
    },
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));