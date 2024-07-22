"use client";

import { useState, useTransition } from "react";
import { challengeOptions, challenges } from "@/db/schema";

import Confetti from "react-confetti"
import { Header } from "@/app/lesson/Header";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";
import { Footer } from "@/app/lesson/Footer";
import { upserChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from 'react-use';
import Image from "next/image";
import { ResultCard } from "./ResultCard";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

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
    const { width, height } = useWindowSize();

    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if(initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const router = useRouter();

    const [correctAudio, , correctControls] = useAudio({ src: "/assets/audios/correct.wav" });
    const [incorrectAudio, , incorrectControls] = useAudio({ src: "/assets/audios/incorrect.wav" });
    const [finishAudio] = useAudio({ src: "/assets/audios/finish.mp3", autoPlay: true });

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage
    });
    const [challenges] = useState(initialLessonChallenges)
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)

        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    })

    const [selectedOption, setSelectedOption] = useState<number>()

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src={'/assets/images/finish.svg'}
                        className="hidden lg:block"
                        height={100}
                        width={100}
                        alt="Finish"
                    />
                    <Image
                        src={'/assets/images/finish.svg'}
                        className="block lg:hidden"
                        height={60}
                        width={60}
                        alt="Finish"
                    />
                    <h2 className="text-lg lg:text-3xl font-bold text-neutral-700">Great job!<br /> You have completed the lesson.</h2>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}

                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title = challenge.type === "ASSIST"
        ? "Select the correct meaning"
        : challenge.question

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    }

    const onNext = () => {
        setActiveIndex((current) => current + 1)
    }

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct)

        if (!correctOption) {
            return;
        }

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upserChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }

                        setStatus("correct");
                        correctControls.play();
                        setPercentage((prev) => prev + 100 / challenges.length)

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5))
                        }
                    })
                    .catch(() => toast.error("Something went wrong"))
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }

                        setStatus("wrong");
                        incorrectControls.play();

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Something went wrong"))
            })
        }
    }

    return (
        <>
            {correctAudio}
            {incorrectAudio}
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
                                onSelect={onSelect}
                                status="none"
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}
