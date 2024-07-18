import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    title: string;
    id: number;
    imgSrc: string;
    onClick: (id: number) => void;
    disabled?: boolean;
    active?: boolean
}

export const Card = ({
    title,
    id,
    imgSrc,
    disabled,
    onClick,
    active
}: Props) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "select-none h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-56 min-w-52",
                disabled && "pointer-events-none opacity-50"
            )}
        >
            <div className="min-6 w-full flex items-center justify-end">
                { active && (
                    <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                        <Check className="text-white stroke-[4] size-4"/>
                    </div>
                )}
            </div>
            <Image 
                src={ imgSrc }
                alt={title}
                height={70}
                width={93.33}
                className="rounded-lg drop-shadow-md border object-cover select-none"
            />
            <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
        </div>
    )
}
