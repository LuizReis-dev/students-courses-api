import { Student } from "../students/Student";

export interface Course {
    id?: number;
    name?: string;
    description?: string;
    students?: Student[]; 
}