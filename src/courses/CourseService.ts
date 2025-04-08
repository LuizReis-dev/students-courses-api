import { Course } from "./Course";
import { CourseRepository } from "./CourseRepository";

const repository = new CourseRepository();

export class CourseService {

    async create(course: Course): Promise<{ course: Course }> {

        if (!course.name || !course.description) {
            throw new Error("Informe nome e a descrição");
        }
        let createdCourse = await repository.create(course);

        return { course: createdCourse };
    }

    async getAll(): Promise<Course[]> {
        return repository.getAll();
    }

    async getById(id: Number): Promise<Course> {
        let course = await repository.getById(id);
        if (!course) {
            throw new Error("Curso não encontrado");
        }
        return course;
    }

    async update(id: Number, course: Course): Promise<Course> {
        let courseDb = await repository.getById(id);
        if (!courseDb) {
            throw new Error("Curso não encontrado");
        }

        if (!course.name || !course.description) {
            throw new Error("Informe nome e a descrição");
        }


        return repository.update(id, course);
    }

    async destroy(id: Number): Promise<void> {
        let courseDb = await repository.getById(id);
        if (!courseDb) {
            throw new Error("Curso não encontrado");
        }

        await repository.destroy(id);

    }


}