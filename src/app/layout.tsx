import type { Metadata } from "next";
import "./globals.css";
import { Cabin } from "next/font/google";
import Head from "next/head";

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
            <Head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
            </Head>
            <body className={cabin.className}>{children}</body>
        </html>
    );
}
