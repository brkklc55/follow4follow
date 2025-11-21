"use client";

import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardUser {
    fid: number;
    username: string;
    points: number;
}

export function Leaderboard() {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);

    useEffect(() => {
        // Mock leaderboard data for now since we need real DB population
        setUsers([
            { fid: 1, username: 'dwr.eth', points: 1500 },
            { fid: 2, username: 'v', points: 1200 },
            { fid: 3, username: 'vitalik.eth', points: 900 },
            { fid: 4, username: 'base', points: 850 },
            { fid: 5, username: 'clanker', points: 500 },
        ]);
    }, []);

    return (
        <div className="w-full max-w-sm bg-card rounded-xl border border-border p-4 space-y-4">
            <div className="flex items-center space-x-2 text-yellow-500">
                <Trophy size={24} />
                <h2 className="text-xl font-bold">Top Farmers</h2>
            </div>

            <div className="space-y-2">
                {users.map((user, index) => (
                    <div key={user.fid} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <span className="font-bold text-muted-foreground w-6">#{index + 1}</span>
                            <span className="font-medium">@{user.username}</span>
                        </div>
                        <span className="font-bold text-primary">{user.points} pts</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
