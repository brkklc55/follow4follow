import { NextResponse } from 'next/server';
import { neynarClient } from '@/lib/neynar';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch casts from the global feed using string literals to avoid enum issues
        // @ts-ignore
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
        return NextResponse.json({ error: "Failed to fetch casts. Check API Key." }, { status: 500 });
    }
}
