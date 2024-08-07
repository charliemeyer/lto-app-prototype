import type { Metadata } from "next";
import "./globals.css";
import { Cabin } from "next/font/google";

export const metadata: Metadata = {
    title: "LTO Show App",
    description: "Track companies and contacts at a trade show",
};

const cabin = Cabin({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cabin.className}>{children}</body>
        </html>
    );
}
