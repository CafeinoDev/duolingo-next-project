import 'dotenv/config';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import { challengeOptions } from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding db...");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/assets/flags/es.svg"
            },
            {
                id: 2,
                title: "Italy",
                imageSrc: "/assets/flags/it.svg"
            },
            {
                id: 3,
                title: "Croatian",
                imageSrc: "/assets/flags/hr.svg"
            },
            {
                id: 4,
                title: "Japan",
                imageSrc: "/assets/flags/jp.svg"
            },
            {
                id: 5,
                title: "French",
                imageSrc: "/assets/flags/fr.svg"
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1
            }
        ]);


        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns"
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs"
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Verbs"
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Verbs"
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Verbs"
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Which one of these is the "the woman"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                correct: true,
                text: "El hombre",
                imageSrc: "/assets/images/man.png",
                audioSrc: "/assets/audios/es_man.mp3",
            },
            {
                challengeId: 1,
                correct: false,
                text: "La mujer",
                imageSrc: "/assets/images/woman.png",
                audioSrc: "/assets/audios/es_woman.mp3",
            },
            {
                challengeId: 1,
                correct: false,
                text: "El robot",
                imageSrc: "/assets/images/robot.png",
                audioSrc: "/assets/audios/es_robot.mp3",
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: true,
                text: "El hombre",
                audioSrc: "/assets/audios/es_man.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "La mujer",
                audioSrc: "/assets/audios/es_woman.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "El robot",
                audioSrc: "/assets/audios/es_robot.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                correct: false,
                text: "El hombre",
                imageSrc: "/assets/images/man.png",
                audioSrc: "/assets/audios/es_man.mp3",
            },
            {
                challengeId: 3,
                correct: true,
                text: "La mujer",
                imageSrc: "/assets/images/woman.png",
                audioSrc: "/assets/audios/es_woman.mp3",
            },
            {
                challengeId: 3,
                correct: false,
                text: "El robot",
                imageSrc: "/assets/images/robot.png",
                audioSrc: "/assets/audios/es_robot.mp3",
            },
        ])


        await db.insert(schema.challenges).values([
            {
                id: 5,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 6,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 7,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Which one of these is the "the woman"?',
            },
        ]);


        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
}

main();