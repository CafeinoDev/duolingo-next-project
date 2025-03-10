import { Button } from '@/components/ui/button';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
    title: string;
    description: string;
}

export const UnitBanner = ({description, title}: Props) => {
  return (
    <div className='w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between gap-4'>
        <div className="space-y-2.5">
            <h3 className='text-2xl font-bold'>{title}</h3>
            <p className='text-lg'>{description}</p>
        </div>
        <Link href="/lesson">
            <Button size={'lg'} variant={'secondary'} className='hidden lg:flex border-2 border-b-4 active:border-b-2'>
                <NotebookText className='mr-2'/>
            </Button>
        </Link>
    </div>
  )
}
