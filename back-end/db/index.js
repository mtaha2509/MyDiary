const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MyDiary",
  password: "ostrich2509",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
