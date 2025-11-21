"use client";

import { useAppStore } from '@/store/useAppStore';
import { FollowTab } from './tabs/FollowTab';
import { LikeTab } from './tabs/LikeTab';
import { ReplyTab } from './tabs/ReplyTab';
import { RepostTab } from './tabs/RepostTab';
import { UnfollowTab } from './tabs/UnfollowTab';
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
            case 'like':
                return <LikeTab />;
            case 'reply':
                return <ReplyTab />;
            case 'repost':
                return <RepostTab />;
            case 'unfollow':
                return <UnfollowTab />;
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
