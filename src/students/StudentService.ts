import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

const repository = new StudentRepository();

export class StudentService {

    async create(student: Student): Promise<{ student: Student }> {

        if (!student.name || !student.birthdate) {
            throw new Error("Informe nome e data de nascimento");
        }

        const birthdate = new Date(student.birthdate);
        if (isNaN(birthdate.getTime())) {
            throw new Error("Informe uma data de nascimento válida");
        }

        let createdStudent = await repository.create(student);

        return { student: createdStudent };
    }

    async getAll(): Promise<Student[]> {
        return repository.getAll();
    }

    async getById(id: Number): Promise<Student> {
        let student = await repository.getById(id);
        if (!student) {
            throw new Error("Aluno não encontrado");
        }
        return student;
    }

    async update(id: Number, student: Student): Promise<Student> {
        let studentDb = await repository.getById(id);
        if (!studentDb) {
            throw new Error("Aluno não encontrado");
        }

        if (!student.name || !student.birthdate) {
            throw new Error("Informe nome e data de nascimento");
        }

        const birthdate = new Date(student.birthdate);
        if (isNaN(birthdate.getTime())) {
            throw new Error("Informe uma data de nascimento válida");
        }

        return repository.update(id, student);
    }

    async destroy(id: Number): Promise<void> {
        let studentDb = await repository.getById(id);
        if (!studentDb) {
            throw new Error("Aluno não encontrado");
        }

        await repository.destroy(id);

    }


}