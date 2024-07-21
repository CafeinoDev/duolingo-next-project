"use client";

import { useState } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "@/app/lesson/Header";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";

type Props = {
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    initialHearts: number;
    initialPercentage: number;
    userSubscription: any; // TODO: Replace with subscription from DB
}

export const Quiz = ({
    initialHearts,
    initialLessonChallenges,
    initialLessonId,
    initialPercentage,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)

        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    })

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const title = challenge.type === "ASSIST"
        ? "Select the correct meaning"
        : challenge.question


    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-80 lg:max-w-screen-sm w-full px-6 lg:px-0 flex flex-col gap-y-12 mx-auto">
                        <h1 className="text-lg lg:text-3xl text-center font-bold text-neutral-700">{title}</h1>
                        <div>
                            {
                                challenge.type === "ASSIST" && (
                                    <QuestionBubble question={challenge.question} />
                                )
                            }
                            <Challenge
                                options={options}
                                onSelect={() => {}}
                                status="none"
                                selectedOption={undefined}
                                disabled={false}
                                type={ challenge.type }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
