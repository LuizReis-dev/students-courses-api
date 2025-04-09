import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

const repository = new StudentRepository();

export class StudentService {

    async create(student: Student): Promise<Student> {
        if (!student.name || !student.birthdate || !student.courses_ids) {
            throw new Error("Informe nome, data de nascimento e os cursos do aluno");
        }

        const birthdate = new Date(student.birthdate);
        if (isNaN(birthdate.getTime())) {
            throw new Error("Informe uma data de nascimento válida");
        }

        if(!student.courses_ids) {
            throw new Error("Informe os cursos do aluno");
        }

        let createdStudent = await repository.create(student);
        delete createdStudent.courses_ids;
        return createdStudent;
    }

    async getAll(): Promise<Student[]> {
        return repository.getAll();
    }

    async getById(id: Number): Promise<Student> {
        let student = await repository.getById(id);
        if (!student || Object.keys(student).length == 0) {
            throw new Error("Aluno não encontrado");
        }
        return student;
    }

    async update(id: Number, student: Student): Promise<Student> {
        let studentDb = await repository.getById(id);
        if (!studentDb || Object.keys(studentDb).length == 0) {
            throw new Error("Aluno não encontrado");
        }

        if (!student.name || !student.birthdate || !student.courses_ids) {
            throw new Error("Informe nome, data de nascimento e os cursos do aluno");
        }

        const birthdate = new Date(student.birthdate);
        if (isNaN(birthdate.getTime())) {
            throw new Error("Informe uma data de nascimento válida");
        }

        return repository.update(id, student);
    }

    async patch(id: Number, student: Student): Promise<Student> {
        let studentDb = await repository.getById(id);
        if (!studentDb || Object.keys(studentDb).length == 0) {
            throw new Error("Aluno não encontrado");
        }

        if(student.name) {
            studentDb.name = student.name;
        }

        if(student.birthdate) {
            const birthdate = new Date(student.birthdate);
            if (isNaN(birthdate.getTime())) {
                throw new Error("Informe uma data de nascimento válida");
            }
            studentDb.birthdate = birthdate;
        }

        delete studentDb.courses_ids;
        if(student.courses_ids) {
            studentDb.courses_ids = student.courses_ids;
        }

        return repository.update(id, studentDb);
    }

    async destroy(id: Number): Promise<void> {
        let studentDb = await repository.getById(id);
        if (!studentDb || Object.keys(studentDb).length == 0) {
            throw new Error("Aluno não encontrado");
        }

        await repository.destroy(id);

    }


}