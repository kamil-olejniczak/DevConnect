const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const validateUserRegisterInput = require("../../validation/register");
const validateUserLoginInput = require("../../validation/login");

/**
 * @route POST api/users/register
 * @desc Registers user
 * @access Public
 **/
router.post("/register", (req, res) => {
  const { errors, isValid } = validateUserRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already in use!";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(error => console.log(error));
        });
      });
    }
  });
});

/**
 * @route POST api/users/login
 * @desc Returns JSON Web Token to login user
 * @access Public
 **/
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateUserLoginInput({ email, password });

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Email or user not found!";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(payload, process.env.SECRET_JWT_TOKEN, { expiresIn: 3600 }, (error, token) => {
          return res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password or user is invalid!";
        return res.status(404).json(errors);
      }
    });
  });
});

/**
 * @route GET api/users/current
 * @desc Returns current user
 * @access Private
 **/
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  return res.json(req.user);
});

module.exports = router;
