import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

const repository = new StudentRepository();

export class StudentService {

    async create(student: Student) : Promise<{ student: Student }>  {
        
        if (!student.name || !student.birthdate) {
            throw new Error("Informe nome e data de nascimento");
        }
        
        const birthdate = new Date(student.birthdate);
        if (isNaN(birthdate.getTime())) {
            throw new Error("Informe uma data de nascimento válida");
        }

        let createdStudent = await repository.create(student);

        return { student: createdStudent};
    }
}