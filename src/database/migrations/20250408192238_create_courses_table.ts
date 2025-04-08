import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tb_courses", (table: any) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("description");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tb_courses");
}

