const { check } = require("express-validator");
const db = require("../db");
const { compare, hash } = require("bcrypt");

// Password validation
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password has to be between 6 and 15 characters.");

// Username validation (assuming username follows email format)
const username = check("username")
  .isEmail()
  .withMessage("Please provide a valid email.");

// Check if username exists
const usernameExists = check("username").custom(async (value) => {
  const { rows } = await db.query("SELECT * from users WHERE username = $1", [
    value,
  ]);

  if (rows.length) {
    throw new Error("Username already exists.");
  }
});

// Login validation
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  console.log(value);
  const user = await db.query("SELECT * from users WHERE username = $1", [
    value,
  ]);

  if (!user.rows.length) {
    throw new Error("Username does not exist.");
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [username, password, usernameExists],
  loginValidation: [loginFieldsCheck],
};
