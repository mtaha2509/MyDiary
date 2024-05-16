import pg from "pg";

const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "MyDiary",
    password: "katymother",
    port: "5432",
});

export default db;
