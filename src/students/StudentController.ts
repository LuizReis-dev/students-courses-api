import { Request, Response } from "express";

export class StudentController {
    static create(request: Request, response: Response) {
        response.send(request.body)
    }
}