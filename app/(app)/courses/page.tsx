import { getCourses } from "@/db/queries";
import { List } from "./list";

export const CoursesPage = async () => {
    const courses = await getCourses();

    return (
        <div className="h-full max-w-screen-lg px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Languages Courses
            </h1>
            <List
                courses={courses}
                activeCourseId={1}
            />
        </div>
    )
}

export default CoursesPage;