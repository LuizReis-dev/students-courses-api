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
        const rows = await db("tb_courses as c")
            .leftJoin("tb_students_courses as sc", "c.id", "sc.course_id")
            .leftJoin("tb_students as s", "s.id", "sc.student_id")
            .select(
                "c.id as course_id",
                "c.name",
                "c.description",
                "s.id as student_id",
                "s.name as student_name",
            )
            .where("c.id", id);

        if (rows.length === 0) {
            return {};
        }
        const course: Course = {
            id: rows[0].course_id,
            name: rows[0].name,
            description: rows[0].description,
            students: []
        };

        for (const row of rows) {
            if (row.student_id) {
                course.students!.push({
                    id: row.student_id,
                    name: row.student_name
                });
            }
        }

        return course;
    }

    async update(id: Number, course: Course): Promise<Course> {
        const [updatedCourse] = await db("tb_courses").where({ id }).update(course).returning("*");;
        return updatedCourse;
    }

    async destroy(id: Number): Promise<void>{
        await db("tb_courses").where({ id }).delete();
    }
}