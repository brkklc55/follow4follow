"use client";

import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';

interface User {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
    bio: string;
}

export function FollowTab() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/feed/follow');
            if (!res.ok) {
                const text = await res.text();
                console.error('API Error:', text);
                throw new Error(`API failed with status ${res.status}`);
            }
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleFollow = () => {
        // TODO: Implement follow verification
        alert(`Followed ${user?.username}! Verifying...`);
        fetchUser(); // Get next user
    };

    if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-6">
            <h1 className="text-2xl font-bold text-primary">Follow 4 Follow</h1>

            {user && (
                <div className="w-full max-w-sm bg-card rounded-xl border border-border p-6 flex flex-col items-center text-center space-y-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.pfpUrl} alt={user.username} className="w-24 h-24 rounded-full border-2 border-primary" />
                    <div>
                        <h2 className="text-xl font-bold">{user.displayName}</h2>
                        <p className="text-muted-foreground">@{user.username}</p>
                    </div>
                    <p className="text-sm">{user.bio}</p>

                    <button
                        onClick={handleFollow}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                    >
                        <UserPlus size={20} />
                        <span>Follow</span>
                    </button>
                </div>
            )}
        </div>
    );
}
