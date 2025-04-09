import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tb_students_courses", (table: any) => {
        table.integer("student_id").unsigned().notNullable();
        table.integer("course_id").unsigned().notNullable();
        
        table.primary(['student_id', 'course_id']);

        table.foreign('student_id').references('id').inTable('tb_students').onDelete('CASCADE');
        table.foreign('course_id').references('id').inTable('tb_courses').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tb_students_courses");
}

