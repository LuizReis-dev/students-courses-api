import { Request, Response } from "express";
import { CreateStudentDTO } from "./CreateStudentDTO";
import { StudentService } from "./StudentService";

const service = new StudentService();
export class StudentController {
    static async create(request: Request, response: Response) {
        const data: CreateStudentDTO = request.body;

        try {
            const user = await service.create(data);
            response.status(201).json(user);
        } catch (error) {
            console.log(error)
            response.status(500).json({ message: "Erro ao criar usuário", error });
        }
    }
}