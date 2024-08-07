import { Header } from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "LTO Show App",
    description: "Track companies and contacts at a trade show",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
