export class Student {
    id?: number;
    name!: string;
    birthdate!: Date;

    constructor(props: Omit<Student, "id">, id?: number) {
        Object.assign(this, props);
        if (id) this.id = id;
    }
}