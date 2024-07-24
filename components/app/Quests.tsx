import { Button } from '@/components/ui/button';
import { QUESTS_DATA } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Progress } from '@/components/ui/progress';

type Props = {
    points: number;
}
export const Quest = ({ points }: Props) => {
    return (
        <div className='border-2 rounded-xl p-4 space-y-4'>
            <div className='flex items-center justify-between w-full space-y-2'>
                <h3 className='font-bold text-lg'>
                    Quests
                </h3>
                <Button variant="primaryOutline" size="sm" asChild>
                    <Link href={"/quests"}>
                        View all
                    </Link>
                </Button>
            </div>
            <ul className='w-full space-y-4'>
                {
                    QUESTS_DATA.map((quest) => {
                        const progress = (points / quest.value) * 100;

                        return (
                            <div className="flex items-center w-full pb-4 gap-x-3" key={quest.title}>
                                <Image
                                    src="/assets/images/points.svg"
                                    alt="Points"
                                    width={40}
                                    height={40}
                                />
                                <div className="flex flex-col gap-y-2 w-full">
                                    <p className="text-neutral-700 text-sm font-bold">
                                        {quest.title}
                                    </p>
                                    <Progress
                                        value={progress}
                                        className="h-3"
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}
