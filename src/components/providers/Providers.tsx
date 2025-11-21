"use client";

import { AuthKitProvider } from "@farcaster/auth-kit";
import sdk from "@farcaster/frame-sdk";
import { useEffect } from "react";

const config = {
    rpcUrl: "https://mainnet.optimism.io",
    domain: "follow4follow-seven.vercel.app",
    siweUri: "https://follow4follow-seven.vercel.app/login",
};

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const load = async () => {
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
