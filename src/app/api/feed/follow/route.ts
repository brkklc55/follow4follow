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
    } catch (error: any) {
        console.error("Feed Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "Unknown error";
        return NextResponse.json({ error: `API Failed: ${errorMessage}` }, { status: 500 });
    }
}
