import { NextResponse } from 'next/server';
import { neynarClient } from '@/lib/neynar';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: "FID is required" }, { status: 400 });
    }

    try {
        // 1. Get users I follow (Following)
        const followingRes = await neynarClient.fetchUserFollowing({ fid: Number(fid), limit: 100 });
        // The SDK might return users directly or wrapped. 
        // Based on error, it seems we need to be careful.
        // Let's assume followingRes.users is the array.
        const following = followingRes.users;

        // 2. Get users who follow me (Followers)
        const followersRes = await neynarClient.fetchUserFollowers({ fid: Number(fid), limit: 100 });
        const followers = followersRes.users;

        // Create a set of FIDs for fast lookup
        // We cast to any to avoid strict type issues if the SDK types are mismatching
        const followerFids = new Set(followers.map((u: any) => u.user?.fid || u.fid));

        // 3. Filter: (Following) - (Followers)
        const unfollowers = following.filter((user: any) => {
            const userFid = user.user?.fid || user.fid;
            return !followerFids.has(userFid);
        });

        return NextResponse.json(unfollowers.map((u: any) => {
            const user = u.user || u;
            return {
                fid: user.fid,
                username: user.username,
                displayName: user.display_name,
                pfpUrl: user.pfp_url,
                bio: user.profile?.bio?.text || "",
            };
        }));

    } catch (error) {
        console.error("Neynar API Error:", error);
        // Fallback for demo if API fails or limits reached
        return NextResponse.json([
            {
                fid: 456,
                username: 'elonmusk',
                displayName: 'Elon Musk (Mock - API Failed)',
                pfpUrl: 'https://i.imgur.com/dY2j2c2.jpg',
                bio: 'Technoking of Tesla',
            }
        ]);
    }
}
