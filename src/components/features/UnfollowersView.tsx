"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, UserMinus } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import sdk from "@farcaster/frame-sdk";

interface User {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
    bio: string;
}

interface UnfollowersViewProps {
    onBack: () => void;
}

export function UnfollowersView({ onBack }: UnfollowersViewProps) {
    const { currentUser } = useAppStore();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnfollowers = async () => {
            if (!currentUser?.fid) return;

            try {
                const res = await fetch(`/api/miniapps/unfollowers?fid=${currentUser.fid}`);
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch unfollowers', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUnfollowers();
    }, [currentUser]);

    const handleUnfollow = (fid: number) => {
        sdk.actions.viewProfile({ fid });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b border-border">
                <button onClick={onBack} className="p-2 hover:bg-muted rounded-full mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Unfollowers</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="text-center text-muted-foreground">Loading...</div>
                ) : users.length === 0 ? (
                    <div className="text-center text-muted-foreground">Everyone follows you back! 🎉</div>
                ) : (
                    users.map((user) => (
                        <div key={user.fid} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                            <div className="flex items-center space-x-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={user.pfpUrl} alt={user.username} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-bold">{user.displayName}</p>
                                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleUnfollow(user.fid)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
                                title="View Profile to Unfollow"
                            >
                                <UserMinus size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
