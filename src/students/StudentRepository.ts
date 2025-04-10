import db from "../database";
import { Student } from "./Student";

export class StudentRepository {
    async create(student: Student): Promise<Student> {
        const [id] = await db("tb_students")
            .insert({
                name: student.name,
                birthdate: student.birthdate,
            })
            .returning("id");

        if (student.courses_ids && student.courses_ids.length > 0) {
            const studentCourses = student.courses_ids.map((courseId) => ({
                student_id: id.id,
                course_id: courseId,
            }));

            await db("tb_students_courses")
                .insert(studentCourses)
                .onConflict(["student_id", "course_id"])
                .ignore();
        }

        return this.getById(id.id);
    }

    async getAll(): Promise<Student[]> {
        return db.select("*").from("tb_students");
    }

    async getById(id: Number): Promise<Student> {
        const rows = await db("tb_students as s")
            .leftJoin("tb_students_courses as sc", "s.id", "sc.student_id")
            .leftJoin("tb_courses as c", "c.id", "sc.course_id")
            .select(
                "s.id as student_id",
                "s.name",
                "s.birthdate",
                "c.id as course_id",
                "c.name as course_name",
                "c.description as course_description"
            )
            .where("s.id", id);

        if (rows.length === 0) {
            return {};
        }
        const student: Student = {
            id: rows[0].student_id,
            name: rows[0].name,
            birthdate: rows[0].birthdate,
            courses: [],
        };

        for (const row of rows) {
            if (row.course_id) {
                student.courses!.push({
                    id: row.course_id,
                    name: row.course_name,
                    description: row.course_description
                });
            }
        }

        return student;
    }

    async update(id: Number, student: Student): Promise<Student> {
        await db("tb_students")
            .where({ id })
            .update({
                name: student.name,
                birthdate: student.birthdate,
            });

        if (student.courses_ids) {
            await db("tb_students_courses").where("student_id", id).delete();

            const studentCourses = student.courses_ids.map((courseId) => ({
                student_id: id,
                course_id: courseId,
            }));

            await db("tb_students_courses")
                .insert(studentCourses)
                .onConflict(["student_id", "course_id"])
                .ignore();
        }

        return this.getById(id);
    }

    async destroy(id: Number): Promise<void> {
        await db("tb_students_courses").where("student_id", id).delete();
        await db("tb_students").where({ id }).delete();
    }
}
