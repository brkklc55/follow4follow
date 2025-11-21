"use client";

import { UnfollowersView } from '@/components/features/UnfollowersView';
import { Leaderboard } from '@/components/features/Leaderboard';
import { useState } from 'react';
import { Users, Trophy } from 'lucide-react';

export function UnfollowTab() {
    const [view, setView] = useState<'menu' | 'unfollowers' | 'leaderboard'>('menu');

    if (view === 'unfollowers') return <UnfollowersView onBack={() => setView('menu')} />;

    if (view === 'leaderboard') {
        return (
            <div className="flex flex-col h-full p-4 space-y-4">
                <button onClick={() => setView('menu')} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
                <Leaderboard />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-6">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setView('unfollowers')}
                    className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-primary transition-colors"
                >
                    <Users className="w-8 h-8 text-primary mb-2" />
                    <span className="font-semibold">Unfollowers</span>
                </button>

                <button
                    onClick={() => setView('leaderboard')}
                    className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-primary transition-colors"
                >
                    <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                    <span className="font-semibold">Leaderboard</span>
                </button>
            </div>
        </div>
    );
}
