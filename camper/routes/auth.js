const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.render("auth/register");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "You are successfully logged in!");
      res.redirect("/campgrounds");
    });
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    console.log("loginauthentication");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are successfully logged out!");
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
