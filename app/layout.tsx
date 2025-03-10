import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/app/modals/ExitModal";
import "./globals.css";
import { HeartsModal } from "@/components/app/modals/HeartsModal";
import { PracticeModal } from "@/components/app/modals/PracticeModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DuoNext",
    description: "Practice languages in a fun way",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            afterSignOutUrl='/'
        >
            <html lang="en">
                <body className={font.className}>
                    {children}
                    <Toaster />
                    <ExitModal />
                    <HeartsModal />
                    <PracticeModal />
                </body>
            </html>
        </ClerkProvider>
    );
}
