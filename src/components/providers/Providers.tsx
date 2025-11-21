"use client";

import { AuthKitProvider } from "@farcaster/auth-kit";

const config = {
    rpcUrl: "https://mainnet.optimism.io", // Or a free public RPC
    domain: "example.com", // Should be real domain in prod
    siweUri: "https://example.com/login",
};

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthKitProvider config={config}>
            {children}
        </AuthKitProvider>
    );
}
