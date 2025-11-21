import { NextResponse } from 'next/server';
import { neynarClient } from '@/lib/neynar';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Search for users to find someone active to follow
        // We search for common terms to get a list
        const response = await neynarClient.searchUser({ q: 'eth', limit: 20 });

        if (!response.result.users || response.result.users.length === 0) {
            throw new Error("No users found");
        }

        // Pick a random user from the list
        const randomUser = response.result.users[Math.floor(Math.random() * response.result.users.length)];

        return NextResponse.json({
            fid: randomUser.fid,
            username: randomUser.username,
            displayName: randomUser.display_name,
            pfpUrl: randomUser.pfp_url,
            bio: randomUser.profile.bio.text,
        });
    } catch (error) {
        console.error("Neynar API Error:", error);
        // Fallback mock data if API fails (e.g. no key)
        return NextResponse.json({
            fid: 123,
            username: 'dwr.eth',
            displayName: 'Dan Romero (Fallback)',
            pfpUrl: 'https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7BQQh8re5_qquIuxnLhboxqi8BElPNv82UEw1yP1xrcs0htVO9z36-WcQ3XvI-s_sZJcUs',
            bio: 'Working on Farcaster and Warpcast.',
        });
    }
}
