import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2jLNY97cz1wSOm0XLdAylGxxZ6j"
]

export const isAdmin = async () => {
    const { userId } = await auth();

    if(!userId) return false;

    return adminIds.indexOf(userId) !== -1
}