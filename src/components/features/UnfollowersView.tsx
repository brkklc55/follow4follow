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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUnfollowers = async () => {
            if (!currentUser?.fid) return;
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`/api/miniapps/unfollowers?fid=${currentUser.fid}`);
                const data = await res.json();

                if (!res.ok || data.error) {
                    if (data.code === "PREMIUM_FEATURE") {
                        setError("PREMIUM_FEATURE");
                        return;
                    }
                    throw new Error(data.error || "Failed to fetch unfollowers");
                }

                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                }
            } catch (error: any) {
                console.error('Failed to fetch unfollowers', error);
                setError(error.message || "An error occurred");
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
                ) : error === "PREMIUM_FEATURE" ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                        <div className="bg-yellow-500/10 p-4 rounded-full">
                            <UserMinus size={48} className="text-yellow-500" />
                        </div>
                        <h2 className="text-xl font-bold text-yellow-500">Premium Feature</h2>
                        <p className="text-muted-foreground">
                            Viewing unfollowers requires a Neynar Premium plan.
                            Please upgrade your API key to access this feature.
                        </p>
                        <button onClick={onBack} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg">
                            Go Back
                        </button>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 p-4">
                        <p>{error}</p>
                        <p className="text-sm mt-2">Please check your API configuration.</p>
                    </div>
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
