import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fid, username, displayName, pfpUrl } = body;

        if (!fid) {
            return NextResponse.json({ error: "FID is required" }, { status: 400 });
        }

        // Upsert user: Create if not exists, update if exists
        const user = await prisma.user.upsert({
            where: { fid: Number(fid) },
            update: {
                username,
                displayName,
                pfpUrl,
                lastActive: new Date(),
            },
            create: {
                fid: Number(fid),
                username,
                displayName,
                pfpUrl,
                points: 0,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}
