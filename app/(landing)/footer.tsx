import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Flag {
    country: string;
    src: string;
    size: {
        width: number;
        height: number;
    }
}

const Flags: Flag[] = [
    {
        country: 'Spain',
        src: '/assets/flags/es.svg',
        size: {
            width: 40,
            height: 32
        }
    },
    {
        country: 'Croatian',
        src: '/assets/flags/hr.svg',
        size: {
            width: 40,
            height: 32
        }
    },
    {
        country: 'Japan',
        src: '/assets/flags/jp.svg',
        size: {
            width: 40,
            height: 32
        }
    },
    {
        country: 'Italy',
        src: '/assets/flags/it.svg',
        size: {
            width: 40,
            height: 32
        }
    },
    {
        country: 'French',
        src: '/assets/flags/fr.svg',
        size: {
            width: 40,
            height: 32
        }
    },
]

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full group">
                {
                    !!Flags.length && Flags.map((item) => (
                        <Button key={item.country} size={'lg'} variant={'ghost'} className="w-full">
                            <Image
                                src={ item.src }
                                alt={`${ item.country } flag`}
                                width={item.size.width}
                                height={item.size.height}
                                className="mr-4 rounded-sm border-b-2"
                            /> Spain
                        </Button>
                    ))
                }
            </div>
        </footer>
    )
}