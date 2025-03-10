import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    disabled?: boolean;
    lessonId?: number;
    status: "correct" | "wrong" | "none" | "completed";
    onCheck: () => void;
}

export const Footer = ({
    onCheck,
    status,
    disabled,
    lessonId
}: Props) => {
    useKey("Enter", onCheck, {}, [onCheck]);
    const isMobile = useMedia("(max-width: 1024px)")

    return (
        <footer className={
            cn(
                "lg:h-36 h-24 border-t-2",
                status === "correct" && "border-transparent bg-green-100",
                status === "wrong" && "border-transparent bg-rose-100",
            )
        }>
            <div className="max-w-screen-lg h-full mx-auto flex items-center justify-between px-6 lg:px-10">
                {
                    status === "correct" && (
                        <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                            <CheckCircle
                                className="size-6 lg:size-10 mr-4"
                            />
                            Nicely done!
                        </div>
                    )
                }
                {
                    status === "wrong" && (
                        <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                            <XCircle
                                className="size-6 lg:size-10 mr-4"
                            />
                            Try again.
                        </div>
                    )
                }
                {
                    status === "completed" && (
                        <Button
                            variant="default"
                            size={isMobile ? "sm" : "lg"}
                            onClick={() => window.location.href = `/lesson/${lessonId}`}
                        >
                            Practice again
                        </Button>
                    )
                }

                <Button
                    disabled={disabled}
                    className="ml-auto"
                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "secondary"}
                >
                    {status === "none" && "Check"}
                    {status === "correct" && "Next"}
                    {status === "wrong" && "Retry"}
                    {status === "completed" && "Continue"}
                </Button>
            </div>
        </footer>
    )
}
