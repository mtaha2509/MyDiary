// import express from "express";
// import db from "./db";
// import bodyParser from "body-parser";
// import bcrypt from "bcrypt";
// import passport from "passport";
// import { Strategy } from "passport-local";
// import GoogleStrategy from "passport-google-oauth2";
// import session from "express-session";
// import env from "dotenv";
// import cors from "cors";

// const app = express();
// const port = 3000;
// const saltRounds = 10;
// env.config();

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// db.connect();

// // app.get("/", (req, res) => {
// //   res.render("home.ejs");
// // });

// // app.get("/login", (req, res) => {
// //   res.render("login.ejs");
// // });

// // app.get("/register", (req, res) => {
// //   res.render("register.ejs");
// // });

// app.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// // app.get("/secrets", async (req, res) => {
// //   console.log(req.user);

// //   ////////////////UPDATED GET SECRETS ROUTE/////////////////
// //   if (req.isAuthenticated()) {
// //     try {
// //       const result = await db.query(
// //         `SELECT secret FROM users WHERE email = $1`,
// //         [req.user.email]
// //       );
// //       console.log(result);
// //       const secret = result.rows[0].secret;
// //       if (secret) {
// //         res.render("secrets.ejs", { secret: secret });
// //       } else {
// //         res.render("secrets.ejs", { secret: "Jack Bauer is my hero." });
// //       }
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   } else {
// //     res.redirect("/login");
// //   }
// // });

// ////////////////SUBMIT GET ROUTE/////////////////
// // app.get("/submit", function (req, res) {
// //   if (req.isAuthenticated()) {
// //     res.render("submit.ejs");
// //   } else {
// //     res.redirect("/login");
// //   }
// // });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// app.get(
//   "/auth/google/secrets",
//   passport.authenticate("google", {
//     successRedirect: "/secrets",
//     failureRedirect: "/login",
//   })
// );

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/secrets",
//     failureRedirect: "/login",
//   })
// );

// app.post("/register", async (req, res) => {
//   const email = req.body.username;
//   const password = req.body.password;

//   try {
//     const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     if (checkResult.rows.length > 0) {
//       req.redirect("/login");
//     } else {
//       bcrypt.hash(password, saltRounds, async (err, hash) => {
//         if (err) {
//           console.error("Error hashing password:", err);
//         } else {
//           const result = await db.query(
//             "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
//             [email, hash]
//           );
//           const user = result.rows[0];
//           req.login(user, (err) => {
//             console.log("success");
//             res.redirect("/secrets");
//           });
//         }
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// ////////////////SUBMIT POST ROUTE/////////////////
// // app.post("/submit", async function (req, res) {
// //   const submittedSecret = req.body.secret;
// //   console.log(req.user);
// //   try {
// //     await db.query(`UPDATE users SET secret = $1 WHERE email = $2`, [
// //       submittedSecret,
// //       req.user.email,
// //     ]);
// //     res.redirect("/secrets");
// //   } catch (err) {
// //     console.log(err);
// //   }
// // });

// passport.use(
//   "local",
//   new Strategy(async function verify(username, password, cb) {
//     try {
//       const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
//         username,
//       ]);
//       if (result.rows.length > 0) {
//         const user = result.rows[0];
//         const storedHashedPassword = user.password;
//         bcrypt.compare(password, storedHashedPassword, (err, valid) => {
//           if (err) {
//             console.error("Error comparing passwords:", err);
//             return cb(err);
//           } else {
//             if (valid) {
//               return cb(null, user);
//             } else {
//               return cb(null, false);
//             }
//           }
//         });
//       } else {
//         return cb("User not found");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   })
// );

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/secrets",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       try {
//         const result = await db.query("SELECT * FROM users WHERE email = $1", [
//           profile.email,
//         ]);
//         if (result.rows.length === 0) {
//           const newUser = await db.query(
//             "INSERT INTO users (email, password) VALUES ($1, $2)",
//             [profile.email, "google"]
//           );
//           return cb(null, newUser.rows[0]);
//         } else {
//           return cb(null, result.rows[0]);
//         }
//       } catch (err) {
//         return cb(err);
//       }
//     }
//   )
// );
// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// import express from "express";
// import db from "./db.js";
// import bodyParser from "body-parser";
// import bcrypt from "bcrypt";
// import passport from "passport";
// import { Strategy } from "passport-local";
// import GoogleStrategy from "passport-google-oauth2";
// import session from "express-session";
// import env from "dotenv";
// import cors from "cors";

// const app = express();
// const port = 3000;
// const saltRounds = 10;

// app.use(cors());
// app.use(express.json());

// app.use(
//   session({
//     secret: "SECRET",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/", async (req, res) => {
//   try {
//     res.json("Hello");
//   } catch (error) {
//     res.json(error);
//   }
// });

// app.post("/register", async (req, res) => {
//   const email = req.body.username;
//   const password = req.body.password;
//   const first_name = req.body.first_name;
//   const last_name = req.body.last_name;
//   try {
//     const checkResult = await db.query(
//       "SELECT * FROM users WHERE username = $1",
//       [email]
//     );

//     if (checkResult.rows.length > 0) {
//       res.send("Email already exists. Try logging in.");
//     } else {
//       bcrypt.hash(password, saltRounds, async (err, hash) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("Error hashing password");
//         } else {
//           const result = await db.query(
//             "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
//             [first_name, last_name, email, hash]
//           );
//           const user = result.rows[0];
//           console.log(user);
//           req.login(user, (err) => {
//             console.log(err);
//           });
//           res.sendStatus(200);
//         }
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) {
//       return res.status(401).json({ message: info.message });
//     }
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       return res.status(200).json({ user });
//     });
//   })(req, res, next);
// });

// app.post("/diarypage", async (req, res) => {
//   console.log(req.body);

//   // const { userId, diaryEntries } = req.body; // Get userId and diaryEntries from request body
//   // console.log(userId);
//   // console.log(diaryEntries);
//   // try {
//   //   // Insert a new diary entry
//   //   const diaryEntryResult = await db.query(
//   //     "INSERT INTO diaryentries (user_id, template_url) VALUES ($1, $2, NOW()) RETURNING diary_entry_id",
//   //     [userId, diaryEntries.templateUrl]
//   //   );

//   //   const diaryEntryId = diaryEntryResult.rows[0].diary_entry_id;

//   //   // Insert pages for the diary entry
//   //   for (const entry of diaryEntries.pages) {
//   //     await db.query(
//   //       "INSERT INTO diarypages (diary_entry_id, page_number, title, content) VALUES ($1, $2, $3, $4)",
//   //       [diaryEntryId, entry.pageNumber, entry.title, entry.content]
//   //     );
//   //   }

//   //   res.status(200).send("Diary entries saved successfully");
//   // } catch (err) {
//   //   console.error("Error saving diary entries:", err);
//   //   res.status(500).send("Internal Server Error");
//   // }
// });

// passport.use(
//   new Strategy({ usernameField: "email" }, async function (
//     email,
//     password,
//     cb
//   ) {
//     try {
//       const result = await db.query("SELECT * FROM users WHERE username = $1", [
//         email,
//       ]);
//       if (result.rows.length > 0) {
//         const user = result.rows[0];
//         const storedHashPassword = user.password;
//         bcrypt.compare(password, storedHashPassword, (err, isMatch) => {
//           if (err) return cb(err);
//           if (isMatch) {
//             return cb(null, user);
//           } else {
//             return cb(null, false, { message: "Incorrect password" });
//           }
//         });
//       } else {
//         return cb(null, false, { message: "User not found" });
//       }
//     } catch (err) {
//       return cb(err);
//     }
//   })
// );

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

//import passport middleware
require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(passport.initialize());

//import routes
const authRoutes = require("./routes/auth");

//initialize routes
app.use("/api", authRoutes);

//app start
const appStart = () => {
  try {
    app.listen(3000, () => {
      console.log(`The app is running at http://localhost:3000`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
