import { NextResponse } from 'next/server';
import { neynarClient } from '@/lib/neynar';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Use searchCasts (free tier friendly) instead of fetchFeed (paid)
        // @ts-ignore
        const response = await neynarClient.searchCasts({
            q: "farcaster",
            limit: 20,
        });

        // @ts-ignore
        const casts = response.result?.casts || response.casts || [];

        if (casts.length === 0) {
            throw new Error("No casts found");
        }

        // Pick a random cast
        const randomCast = casts[Math.floor(Math.random() * casts.length)];

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
    } catch (error: any) {
        console.error("Neynar API Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "Unknown error";
        return NextResponse.json({ error: `Neynar API Failed: ${errorMessage}` }, { status: 500 });
    }
}
