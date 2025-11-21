"use client";

import { AuthKitProvider } from "@farcaster/auth-kit";
import sdk from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

const config = {
    rpcUrl: "https://mainnet.optimism.io",
    domain: "follow4follow-seven.vercel.app",
    siweUri: "https://follow4follow-seven.vercel.app/login",
};

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const load = async () => {
            const context = await sdk.context;
            if (context?.user) {
                const userData = {
                    fid: context.user.fid,
                    username: context.user.username || "user",
                    displayName: context.user.displayName || "User",
                    pfpUrl: context.user.pfpUrl || "",
                    points: 0,
                };

                useAppStore.getState().setCurrentUser(userData);

                // Register user in DB to join the pool
                try {
                    await fetch('/api/user/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData),
                    });
                } catch (e) {
                    console.error("Failed to register user:", e);
                }
            }
            sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
            isSDKLoaded = true;
            load();
        }
    }, []);

    return (
        <AuthKitProvider config={config}>
            {children}
        </AuthKitProvider>
    );
}

let isSDKLoaded = false;
