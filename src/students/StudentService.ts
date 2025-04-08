import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

const repository = new StudentRepository();

export class StudentService {

    async create(student: Student) : Promise<{ message: string; student: Student }>  {

        let createdStudent = await repository.create(student);

        return { message: "Aluno criado com sucesso", student: createdStudent};
    }
}