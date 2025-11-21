import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Follow4Follow",
  description: "Connect, engage, and grow on Farcaster.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://placehold.co/600x400/855DCD/ffffff?text=Follow4Follow",
      button: {
        title: "Launch App",
        action: {
          type: "launch_frame",
          name: "Follow4Follow",
          url: "https://follow4follow-seven.vercel.app",
          splashImageUrl: "https://placehold.co/200x200/855DCD/ffffff?text=F4F",
          splashBackgroundColor: "#855DCD",
        },
      },
    }),
  },
};

import { Providers } from '@/components/providers/Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
