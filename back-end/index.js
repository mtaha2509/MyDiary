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

import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
  try {
    res.json("Hello");
  } catch (error) {
    res.json(error);
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  try {
    const checkResult = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error hashing password");
        } else {
          const result = await db.query(
            "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, hash]
          );
          const user = result.rows[0];
          console.log(user);
          req.login(user, (err) => {
            console.log(err);
          });
          res.sendStatus(200);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login", async (req, res) => {
  res.json("bye");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/diarypage",
    failureRedirect: "/login",
  })
);

app.post("/diarypage", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    console.log("auth");
  } else {
    console.log("bye");
  }
});

passport.use(
  new Strategy(async function verify(email, password, cb) {
    console.log(email);
    console.log(password);
    try {
      const result = await db.query("SELECT * FROM users WHERE username = $1", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashPassword = user.password;
        bcrypt.compare(password, storedHashPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
