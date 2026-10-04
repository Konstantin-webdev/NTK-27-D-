import { create } from 'zustand';
import type { Category, Criticality, ProcessSMK } from '../types';

interface FilterState {
    searchQuery: string;
    process: ProcessSMK | 'ALL';
    category: Category | 'ALL';
    criticality: Criticality | 'ALL';
    setSearchQuery: (q: string) => void;
    setProcess: (p: ProcessSMK | 'ALL') => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    searchQuery: '',
    process: 'ALL',
    category: 'ALL',
    criticality: 'ALL',
    setSearchQuery: (q) => set({ searchQuery: q }),
    setProcess: (p) => set({ process: p }),
    resetFilters: () => set({ searchQuery: '', process: 'ALL', category: 'ALL', criticality: 'ALL' }),
}));