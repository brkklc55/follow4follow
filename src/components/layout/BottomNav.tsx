"use client";

import { UserPlus, Heart, MessageCircle, Repeat, UserMinus } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

export function BottomNav() {
    const { activeTab, setActiveTab } = useAppStore();

    const tabs = [
        { id: 'follow', label: 'Follow', icon: UserPlus },
        { id: 'like', label: 'Like', icon: Heart },
        { id: 'reply', label: 'Reply', icon: MessageCircle },
        { id: 'repost', label: 'Repost', icon: Repeat },
        { id: 'unfollow', label: 'Unfollow', icon: UserMinus },
    ] as const;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe">
            <div className="flex justify-around items-center h-16">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon size={24} className={cn(isActive && "fill-current opacity-20")} />
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
