import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { neynarClient } from '@/lib/neynar';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Try to get a random user from our "Follow4Follow" pool (DB)
        const userCount = await prisma.user.count();

        if (userCount > 0) {
            const skip = Math.floor(Math.random() * userCount);
            const randomUser = await prisma.user.findFirst({
                skip: skip,
            });

            if (randomUser) {
                return NextResponse.json({
                    fid: randomUser.fid,
                    username: randomUser.username,
                    displayName: randomUser.displayName,
                    pfpUrl: randomUser.pfpUrl,
                    bio: "Follow4Follow Community Member", // We could store bio in DB too
                });
            }
        }

        // 2. Fallback: If DB is empty (or only me), search Neynar
        const response = await neynarClient.searchUser({ q: 'eth', limit: 20 });

        if (!response.result.users || response.result.users.length === 0) {
            throw new Error("No users found");
        }

        const randomUser = response.result.users[Math.floor(Math.random() * response.result.users.length)];

        return NextResponse.json({
            fid: randomUser.fid,
            username: randomUser.username,
            displayName: randomUser.display_name,
            pfpUrl: randomUser.pfp_url,
            bio: randomUser.profile.bio.text,
        });
    } catch (error) {
        console.error("Feed Error:", error);
        return NextResponse.json({
            fid: 123,
            username: 'dwr.eth',
            displayName: 'Dan Romero (Fallback)',
            pfpUrl: 'https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7BQQh8re5_qquIuxnLhboxqi8BElPNv82UEw1yP1xrcs0htVO9z36-WcQ3XvI-s_sZJcUs',
            bio: 'Working on Farcaster and Warpcast.',
        });
    }
}
