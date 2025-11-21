import { NeynarAPIClient } from "@neynar/nodejs-sdk";

if (!process.env.NEYNAR_API_KEY) {
    console.warn("NEYNAR_API_KEY is not set. API calls will fail.");
}

let client: NeynarAPIClient;

try {
    client = new NeynarAPIClient({ apiKey: process.env.NEYNAR_API_KEY || "mock-key" });
} catch (error) {
    console.warn("Failed to initialize Neynar client:", error);
    // Create a dummy client or just let it fail later
    client = new NeynarAPIClient({ apiKey: "mock-key" });
}

export const neynarClient = client;
