import { getLesson, getUserProgress } from "@/db/queries";
import { userProgress } from '@/db/schema';
import { redirect } from "next/navigation";
import { Quiz } from "@/components/app/lesson/Quiz";

type Props = {
    params: {
        lessonId: number;
    }
}

export default async function LessonIdPage({
    params
}: Props) {
    const lessonData = getLesson(params.lessonId);
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress
    ] = await Promise.all([
        lessonData,
        userProgressData
    ])

    if (!lesson || !userProgress) {
        redirect("/learn")
    }

    const initialPercetage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz
            initialLessonId={ lesson.id }
            initialLessonChallenges={ lesson.challenges }
            initialHearts={ userProgress.hearts }
            initialPercentage={ initialPercetage }
            userSubscription={ null } // TODO: Add user subscription
        />
    );
}