import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Loader } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="max-w-screen-lg mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 lg:gap-10">
            <div className="relative size-60 lg:size-96 mb-8 lg:mb-0">
                <Image
                    src="/assets/images/hero.svg"
                    fill
                    alt="Hero"
                />
            </div>
            <div className="flex flex-col items-center gap-y-8">
                <h1 className="text-xl lg:3xl font-bold text-neutral-600 max-w-md text-center lg:text-left">DuoNext: Your Path to Mastering New Languages Through Practice and Learning</h1>

                <div className="flex flex-col items-center gap-y-3 max-w-xs">
                    <ClerkLoading>
                        <Loader className="size-5 text-muted-foreground animate-spin" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedOut>
                            <SignUpButton mode="modal" fallbackRedirectUrl={'/learn'}>
                                <Button size='lg' variant="secondary" className="w-full">
                                    Start learning!
                                </Button>
                            </SignUpButton>
                            <SignInButton mode="modal" fallbackRedirectUrl={'/learn'}>
                                <Button size='lg' variant="primaryOutline" className="w-full">
                                    I already have an account
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Button size={'lg'} variant={'secondary'} asChild>
                                <Link href={'/learn'}>
                                    Continue Learning
                                </Link>
                            </Button>
                        </SignedIn>
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    );
}
