import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import pool from "../database";
import * as helpers from "./helpers";

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.username));
        } else {
          done(null, false, req.flash("message", "Clave incorrecta, intenta de nuevo"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El usuario no existe, intenta de nuevo")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
        done(null, false, req.flash("message", "El usuario ya existe, intenta de nuevo.")
        );
      }
      else {
        const { email } = req.body;
        const [rowsEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rowsEmail.length > 0) {
          done(null, false, req.flash("message", "El Correo ya existe, intenta de nuevo.")
          );
        }
        else {
          let newUser = {
            username,
            password,
            email,
          };
          newUser.password = await helpers.encryptPassword(password);

          // Saving in the Database
          const [result] = await pool.query("INSERT INTO users SET ? ", newUser);
          newUser.id = result.insertId;
          return done(null, newUser);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
