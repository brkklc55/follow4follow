import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
                    bio: "Follow4Follow Community Member",
                });
            }
        }

        // If we are here, either DB is empty or something went wrong with finding the user
        return NextResponse.json({
            error: "Pool is empty. Be the first to join by logging in!",
            empty: true
        }, { status: 404 });

    } catch (error: any) {
        console.error("Database Error:", error);
        // Check for common database errors
        if (error.code === 'P1001' || error.message?.includes("Unable to open database")) {
            return NextResponse.json({
                error: "Database unavailable. Please connect a persistent database (e.g. Vercel Postgres).",
                code: "DB_ERROR"
            }, { status: 503 });
        }

        return NextResponse.json({ error: `Database Error: ${error.message}` }, { status: 500 });
    }
}
