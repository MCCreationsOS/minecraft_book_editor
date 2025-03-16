import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Minecraft Book Editor",
    description: "An easy to use rich text editor for Minecraft books",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                    <footer className="text-center text-sm p-4">
                        <p>
                            By{" "}
                            <Link
                                href="https://github.com/MCCreationsOS"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                MCCreations
                            </Link>
                        </p>
                        <p>
                            NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY
                            OR ASSOCIATED WITH MOJANG.
                        </p>
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}
