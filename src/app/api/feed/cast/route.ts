import { NextResponse } from 'next/server';
import { neynarClient } from '@/lib/neynar';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch casts from the global feed using string literals to avoid enum issues
        const response = await neynarClient.fetchFeed("filter", {
            filterType: "global_trending",
            limit: 20,
        });

        if (!response.casts || response.casts.length === 0) {
            throw new Error("No casts found");
        }

        // Pick a random cast
        const randomCast = response.casts[Math.floor(Math.random() * response.casts.length)];

        return NextResponse.json({
            hash: randomCast.hash,
            text: randomCast.text,
            author: {
                username: randomCast.author.username,
                displayName: randomCast.author.display_name,
                pfpUrl: randomCast.author.pfp_url,
            },
            embeds: randomCast.embeds,
        });
    } catch (error) {
        console.error("Neynar API Error:", error);
        // Fallback mock data
        return NextResponse.json({
            hash: '0x123...',
            text: 'Just building some cool Farcaster mini-apps! 🚀 #farcaster #build (Fallback)',
            author: {
                username: 'v',
                displayName: 'Varun',
                pfpUrl: 'https://i.imgur.com/I2rEbPF.png',
            },
            embeds: [],
        });
    }
}
