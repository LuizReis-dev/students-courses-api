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

    async getAll(): Promise<Student[]> {
        return db.select("*").from("tb_students");
    }

    async getById(id: Number): Promise<Student> {
        return db.select("*").from("tb_students").where('id', id).first();
    }

    async update(id: Number, student: Student): Promise<Student> {
        const [updatedStudent] = await db("tb_students").where({ id }).update(student).returning("*");;
        return updatedStudent;
    }

    async destroy(id: Number): Promise<void>{
        await db("tb_students").where({ id }).delete();
    }
}