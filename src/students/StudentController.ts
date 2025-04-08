import { Request, Response } from "express";
import { StudentService } from "./StudentService";
import { Student } from "./Student";

const service = new StudentService();
export class StudentController {
    static async create(request: Request, response: Response) {
        const data: Student = request.body;

        try {
            const student = await service.create(data);
            response.status(201).json({
                message : "Aluno criado com sucesso!",
                student: student 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                response.status(500).json({ message: "Erro ao criar aluno", error: error.message });
            } else {
                console.log(String(error));
                response.status(500).json({ message: "Erro ao criar aluno", error: "Erro desconhecido" });
            }
        }
    }
}