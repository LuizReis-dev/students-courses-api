import { CreateStudentDTO } from "./CreateStudentDTO";
import { Student } from "./Student";
import { StudentDTO } from "./StudentDTO";
import { StudentRepository } from "./StudentRepository";

const repository = new StudentRepository();

export class StudentService {

    async create(dto: CreateStudentDTO) : Promise<{ message: string; student: StudentDTO }>  {
        const data : Student = new Student({...dto});

        let student = await repository.create(data);

        let returnDto: StudentDTO = student;
        return { message: "Usuário criado com sucesso", student: returnDto};
    }
}