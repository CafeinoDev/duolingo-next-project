import { redirect } from 'next/navigation'

import { FeedWrapper, StickyWrapper } from '@/components/app'
import { Header } from './Header'
import { UserProgress } from '@/components/app'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/db/queries'
import { Unit } from '@/components/app/learn/Unit'
import { lessons, units as unitsSchema } from '@/db/schema'

const LearnPage = async () => {
    const unitsData = getUnits();
    const courseProgressData = getCourseProgress();;
    const lessonPercentageData = getLessonPercentage();
    const userProgressData = getUserProgress();

    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
    }

    if (!courseProgress) {
        redirect('/courses');
    }

    return (
        <div className='flex flex-row-reverse gap-12 px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {
                    units.map((unit) => (
                        <div key={unit.id} className='mb-10'>
                            <Unit
                                id={unit.id}
                                order={unit.order}
                                description={unit.description}
                                title={unit.title}
                                lessons={unit.lessons}
                                activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                                    unit: typeof unitsSchema.$inferSelect;
                                } | undefined}
                                activeLessonPercentage={lessonPercentage}
                            />
                        </div>
                    ))
                }
            </FeedWrapper>
        </div>
    )
}

export default LearnPage