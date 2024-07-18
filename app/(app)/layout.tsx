import { MobileHeader, Sidebar } from "@/components/app";

export default function MainLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MobileHeader />
            <Sidebar className="hidden lg:flex"/>
            <main className="lg:pl-64 h-full pt-24 lg:pt-0">
                <div className="max-w-screen-lg mx-auto pt-6 h-full">
                    {children}
                </div>
            </main>
        </>
    );
}