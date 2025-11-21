"use client";

import { useAppStore } from "@/store/useAppStore";
import { SignInButton, useProfile } from "@farcaster/auth-kit";
import { useEffect } from "react";
import '@farcaster/auth-kit/styles.css';

export function SignIn() {
    const { setCurrentUser } = useAppStore();
    const { profile, isAuthenticated } = useProfile();

    useEffect(() => {
        if (isAuthenticated && profile) {
            // Sync with our store
            setCurrentUser({
                fid: profile.fid || 0,
                username: profile.username || "user",
                displayName: profile.displayName || "User",
                pfpUrl: profile.pfpUrl || "",
                points: 0, // Fetch real points from our DB later
            });
        }
    }, [isAuthenticated, profile, setCurrentUser]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background p-4 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-primary">Follow4Follow</h1>
                <p className="text-muted-foreground">Grow your Farcaster audience.</p>
            </div>

            <div className="scale-125">
                <SignInButton />
            </div>

            <p className="text-xs text-muted-foreground mt-8">
                Scan the QR code with your phone camera or Warpcast app.
            </p>
        </div>
    );
}
