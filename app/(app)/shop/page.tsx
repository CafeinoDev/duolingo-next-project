import { FeedWrapper, StickyWrapper, UserProgress } from "@/components/app";
import { Quest } from "@/components/app/Quests";
import { Items } from "@/components/app/shop/Items";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ShopPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        userSubscription
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
    }

    const activeSubscription = !!userSubscription?.isActive

    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={activeSubscription}
                />
                <Quest points={userProgress.points} />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/assets/images/shop.svg"
                        alt="Shop"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff
                    </p>
                    <Items
                        hasActiveSubscription={activeSubscription}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                    />
                </div>
            </FeedWrapper>
        </div>
    );
}