const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MyDiary",
  password: "Allah Is One",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
