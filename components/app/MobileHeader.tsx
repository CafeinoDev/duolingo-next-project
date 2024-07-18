import React from 'react'
import { MobileSidebar } from '@/components/app/MobileSidebar'

export const MobileHeader = () => {
    return (
        <nav className='lg:hidden px-6 h-24 flex items-center bg-green-300 border-b fixed top-0 w-full z-50'>
            <MobileSidebar />
        </nav>
    )
}
