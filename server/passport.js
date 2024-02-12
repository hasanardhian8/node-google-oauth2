const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // Use the authenticate method of the passport object
      passport.authenticate("google", (err, user, info) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Not Authorized" });
        }
        return done(null, user, info);
      })(req, res, next);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
