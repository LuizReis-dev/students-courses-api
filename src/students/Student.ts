import { Course } from "../courses/Course";

export interface Student {
    id?: number;
    name?: string;
    birthdate?: Date;
    courses_ids?: number[];
    courses?: Course[];
}