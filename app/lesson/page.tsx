import { getLesson, getUserProgress } from "@/db/queries";
import { userProgress } from '../../db/schema';
import { redirect } from "next/navigation";

export default async function LessonPage() {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress
    ] = await Promise.all([
        lessonData,
        userProgressData
    ])

    if (!lesson || !userProgress) {
        redirect("/courses")
    }

    const initialPercetage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <div>
            Lesson Page
        </div>
    );
}