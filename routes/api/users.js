const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

/**
 * @route GET api/users/test
 * @desc Tests users route
 * @access Public
 **/
router.get("/test", (req, res) => res.json({ msg: "Users JSON is working" }));

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 **/
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already in use!" });
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
 * @desc Return JSON Web Token to login user
 * @access Public
 **/
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "Email or user not found!" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          return res.json({ messsage: "Successful login!" });
        } else {
          return res.status(404).json({ password: "Password or user is invalid!" });
        }
      });
    }
  });
});

module.exports = router;
