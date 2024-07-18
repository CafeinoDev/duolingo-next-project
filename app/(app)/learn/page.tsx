
import { FeedWrapper, StickyWrapper } from '@/components/app'
import React from 'react'
import { Header } from './Header'
import { UserProgress } from '@/components/app'

const LearnPage = () => {
    return (
        <div className='flex flex-row-reverse gap-12 px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={{
                        title: "Spanish",
                        imgSrc: "/assets/flags/es.svg"
                    }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Spanish" />
            </FeedWrapper>
        </div>
    )
}

export default LearnPage