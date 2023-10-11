const User = require("../models/user");
const bcrypt = require("bcrypt");
const client = require("../client");


exports.getLogin = (req, res, next) => {
  res.render("account/login", {
    path: "/login",
    title: "Login",
    isAuthenticated: req.session.isAuthenticated,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((isSuccess) => {
          if (isSuccess) {
            req.session.user = user;
            req.session.isAuthenticated = true;
            return req.session.save(function (err) {
              var url = req.session.redirectTo || "/";
              delete req.session.redirectTo;
              return res.redirect(url);
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRegister = (req, res, next) => {
  res.render("account/register", {
    path: "/register",
    title: "Register",
    isAuthenticated: req.session.isAuthenticated,
  });
};

let _user;
exports.postRegister = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/register");
      }

      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      const userRequest = {
        email: req.body.email,
      };
      client.createUserName(userRequest, (err, data) => {
        if (!err) {
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            username:data.userName
          });
          return newUser.save();
        }
      });
      
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getReset = (req, res, next) => {
  res.render("account/reset", {
    path: "/reset-password",
    title: "Reset Password",
  });
};

exports.postReset = (req, res, next) => {
  res.redirect("/login");
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
