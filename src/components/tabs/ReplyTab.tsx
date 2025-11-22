"use client";

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import sdk from "@farcaster/frame-sdk";

interface Cast {
    hash: string;
    text: string;
    author: {
        username: string;
        displayName: string;
        pfpUrl: string;
    };
}

export function ReplyTab() {
    const [cast, setCast] = useState<Cast | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCast = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/feed/cast');
            if (!res.ok) {
                throw new Error("API Failed");
            }
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setCast(data);
        } catch (error: any) {
            console.error('Failed to fetch cast', error);
            setError(error.message || "Failed to load casts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCast();
    }, []);

    const handleReply = () => {
        if (cast) {
            sdk.actions.openUrl(`https://warpcast.com/${cast.author.username}/${cast.hash}`);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-4">
                <p className="text-red-500">{error}</p>
                <button onClick={fetchCast} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">Retry</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-6">
            <h1 className="text-2xl font-bold text-primary">Reply 4 Reply</h1>

            {cast && (
                <div className="w-full max-w-sm bg-card rounded-xl border border-border p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cast.author.pfpUrl} alt={cast.author.username} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-bold">{cast.author.displayName}</p>
                            <p className="text-xs text-muted-foreground">@{cast.author.username}</p>
                        </div>
                    </div>

                    <p className="text-lg">{cast.text}</p>

                    <button
                        onClick={handleReply}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                    >
                        <MessageCircle size={20} />
                        <span>Reply to Cast</span>
                    </button>
                </div>
            )}
        </div>
    );
}
