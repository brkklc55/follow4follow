import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fid, actionType, targetId } = body;

        if (!fid || !actionType || !targetId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // TODO: Verify action with Neynar API (e.g. check if user actually followed)
        // For now, we assume success for the demo.

        // Update user points
        // We use upsert to ensure user exists
        const user = await prisma.user.upsert({
            where: { fid: Number(fid) },
            update: { points: { increment: 10 } },
            create: {
                fid: Number(fid),
                points: 10,
                username: 'user', // Should fetch real data
            },
        });

        // Log action
        await prisma.action.create({
            data: {
                type: actionType,
                targetId: targetId,
                status: 'COMPLETED',
                userId: user.id,
            },
        });

        return NextResponse.json({ success: true, newPoints: user.points });
    } catch (error) {
        console.error("Points Claim Error:", error);
        return NextResponse.json({ error: "Failed to claim points" }, { status: 500 });
    }
}
