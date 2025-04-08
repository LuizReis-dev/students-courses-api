import db from "../database";
import { Student } from "./Student";

export class StudentRepository {

    async create(student: Student): Promise<Student> {
        const [id] = await db("tb_students").insert({
            name: student.name,
            birthdate: student.birthdate
        }).returning("id");
        
        student.id = id.id;
        return student;
    }
}