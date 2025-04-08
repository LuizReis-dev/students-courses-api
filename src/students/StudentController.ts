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
                message: "Aluno criado com sucesso!",
                student: student
            });
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao criar aluno", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao criar aluno", error: "Erro desconhecido" });
            }
        }
    }

    static async getAll(request: Request, response: Response) {
        const students = await service.getAll();
        response.status(200).json(students);
    }

    static async getById(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                throw Error("Id inválido");
            }
            const student = await service.getById(id);
            response.status(200).json(student);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao buscar aluno", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar aluno", error: "Erro desconhecido" });
            }
        }
    }

    static async update(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                throw Error("Id inválido");
            }
            const student = await service.update(id, request.body);
            response.status(200).json(student);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao buscar aluno", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar aluno", error: "Erro desconhecido" });
            }
        }
    }

    static async delete(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                throw Error("Id inválido");
            }
            await service.destroy(id);
            response.status(204).json({});
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao buscar aluno", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar aluno", error: "Erro desconhecido" });
            }
        }
    }
}