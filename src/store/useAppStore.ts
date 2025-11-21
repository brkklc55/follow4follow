import { create } from 'zustand';

type Tab = 'follow' | 'like' | 'reply' | 'repost' | 'unfollow';

interface User {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
    points: number;
}

interface AppState {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    activeTab: 'follow',
    setActiveTab: (tab) => set({ activeTab: tab }),
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
}));
