const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const db = require("../db");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: "SECRET",
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new JwtStrategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        "SELECT id, username FROM users WHERE id = $1",
        [id]
      );
      if (!rows.length) {
        return done(null, false);
      }
      const user = { id: rows[0].id, email: rows[0].username };
      console.log(user);
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  })
);

// Serialize user into session (if using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (if using sessions)
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query(
      "SELECT id, username FROM users WHERE id = $1",
      [id]
    );
    if (!rows.length) {
      return done(null, false);
    }
    const user = { id: rows[0].id, email: rows[0].username };
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
