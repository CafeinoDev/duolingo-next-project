import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton
} from "@clerk/nextjs"

import { SidebarItem } from '@/components/app/SidebarItem';
import { Loader } from 'lucide-react';

type Props = {
    className?: string;
}

interface SidebarItem {
    label: string;
    iconSrc: string;
    href: string;
}

const SidebarItems: SidebarItem[] = [
    {
        label: 'Learn',
        href: '/learn',
        iconSrc: './assets/images/learn.svg'
    },
    {
        label: 'Leaderboard',
        href: '/leaderboard',
        iconSrc: './assets/images/leaderboard.svg'
    },
    {
        label: 'Quests',
        href: '/quests',
        iconSrc: './assets/images/quests.svg'
    },
    {
        label: 'Shop',
        href: '/shop',
        iconSrc: './assets/images/shop.svg'
    },
]

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn('h-full lg:w-64 lg:fixed flex left-0 top- px-4 border-r-2 flex-col', className)}>
            <Link href={'/learn'}>
                <div className='pt-8 pl-4 pb-7 items-center gap-x-3 flex'>
                    <Image
                        src="./assets/images/logo.svg"
                        height={40}
                        width={40}
                        alt="Logo"
                    />
                    <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>DuoNext</h1>
                </div>
            </Link>
            <div className='flex flex-col gap-y-2 flex-1'>
                {
                    !!SidebarItems.length && SidebarItems.map((item: SidebarItem) =>
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    )
                }
            </div>
            <div>
                <ClerkLoading>
                    <Loader className='size-5 text-muted-foreground animate-spin' />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
            </div>
        </div>
    )
}
