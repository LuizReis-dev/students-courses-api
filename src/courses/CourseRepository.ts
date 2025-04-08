import db from "../database";
import { Course } from "./Course";

export class CourseRepository {

    async create(course: Course): Promise<Course> {
        const [id] = await db("tb_courses").insert({
            name: course.name,
            description: course.description
        }).returning("id");
        
        course.id = id.id;
        return course;
    }

    async getAll(): Promise<Course[]> {
        return db.select("*").from("tb_courses");
    }

    async getById(id: Number): Promise<Course> {
        return db.select("*").from("tb_courses").where('id', id).first();
    }

    async update(id: Number, course: Course): Promise<Course> {
        const [updatedCourse] = await db("tb_courses").where({ id }).update(course).returning("*");;
        return updatedCourse;
    }

    async destroy(id: Number): Promise<void>{
        await db("tb_courses").where({ id }).delete();
    }
}