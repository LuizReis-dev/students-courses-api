import { Request, Response } from "express";
import { CourseService } from "./CourseService";
import { Course } from "./Course";

const service = new CourseService();
export class CourseController {
    static async create(request: Request, response: Response) {
        const data: Course = request.body;

        try {
            const course = await service.create(data);
            response.status(201).json({
                message: "Course criado com sucesso!",
                course: course
            });
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao criar curso", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao criar curso", error: "Erro desconhecido" });
            }
        }
    }

    static async getAll(request: Request, response: Response) {
        const courses = await service.getAll();
        response.status(200).json(courses);
    }

    static async getById(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                throw Error("Id inválido");
            }
            const course = await service.getById(id);
            response.status(200).json(course);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao buscar curso", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar curso", error: "Erro desconhecido" });
            }
        }
    }

    static async update(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                throw Error("Id inválido");
            }
            const course = await service.update(id, request.body);
            response.status(200).json(course);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao buscar curso", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar curso", error: "Erro desconhecido" });
            }
        }
    }

    static async patch(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                throw Error("Id inválido");
            }
            const course = await service.patch(id, request.body);
            response.status(200).json(course);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ message: "Erro ao buscar curso", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar curso", error: "Erro desconhecido" });
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
                response.status(400).json({ message: "Erro ao buscar curso", error: error.message });
            } else {
                response.status(400).json({ message: "Erro ao buscar curso", error: "Erro desconhecido" });
            }
        }
    }
}