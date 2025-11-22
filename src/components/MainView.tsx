"use client";

import { useAppStore } from '@/store/useAppStore';
import { FollowTab } from './tabs/FollowTab';
import { BottomNav } from './layout/BottomNav';
import { SignIn } from './auth/SignIn';

export function MainView() {
    const { activeTab, currentUser } = useAppStore();

    if (!currentUser) {
        return <SignIn />;
    }

    const renderTab = () => {
        switch (activeTab) {
            case 'follow':
                return <FollowTab />;
            default:
                return <FollowTab />;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <main className="flex-1 overflow-y-auto pb-20">
                {renderTab()}
            </main>
            <BottomNav />
        </div>
    );
}
