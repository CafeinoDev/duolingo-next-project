import { Button } from '@/components/ui/button'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const Header = () => {
    return (
        <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
            <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
                <div className='pt-8 pl-4 pb-7 items-center gap-x-3 flex'>
                    <Image
                        src="./assets/images/logo.svg"
                        height={40}
                        width={40}
                        alt="Logo"
                    />
                    <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>DuoNext</h1>
                </div>
                <ClerkLoading>
                    <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode='modal' fallbackRedirectUrl="/learn">
                            <Button size="lg" variant="ghost">LOG IN</Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}
