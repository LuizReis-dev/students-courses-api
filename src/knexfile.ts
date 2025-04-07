import dotenv from "dotenv";
import path  from "path";

const currentDir = path.resolve(__dirname);
dotenv.config();

interface DBConfig {
    client: string,
    connection: {
        database: string;
        port: number;
        user: string;
        password: string;
    },
    migrations: {
        tablename: string;
        directory: string;
    }, 
    seed: {
        directory: string;
    }
};

const dbConfig: DBConfig = {
    client: "pg",
    connection: {
        database: process.env.DB_NAME || "postgres",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "1234",
    },
    migrations: {
        tablename: "migrations",
        directory: `${currentDir}/src/database/migrations`
    }, 
    seed: {
        directory: `${currentDir}/src/database/seeds`
    }

};

export default dbConfig;