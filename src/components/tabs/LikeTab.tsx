"use client";

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Cast {
    hash: string;
    text: string;
    author: {
        username: string;
        displayName: string;
        pfpUrl: string;
    };
}

export function LikeTab() {
    const [cast, setCast] = useState<Cast | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCast = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/feed/cast');
            if (!res.ok) {
                const text = await res.text();
                console.error('API Error:', text);
                throw new Error(`API failed with status ${res.status}`);
            }
            const data = await res.json();
            setCast(data);
        } catch (error) {
            console.error('Failed to fetch cast', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCast();
    }, []);

    const handleLike = () => {
        alert(`Liked cast by ${cast?.author.username}! Verifying...`);
        fetchCast();
    };

    if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-6">
            <h1 className="text-2xl font-bold text-primary">Like 4 Like</h1>

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
                        onClick={handleLike}
                        className="w-full py-3 bg-pink-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                    >
                        <Heart size={20} className="fill-current" />
                        <span>Like Cast</span>
                    </button>
                </div>
            )}
        </div>
    );
}
