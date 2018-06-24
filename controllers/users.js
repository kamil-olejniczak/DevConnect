const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");
const validateUserRegisterInput = require("../validation/register");
const validateUserLoginInput = require("../validation/login");

function getCurrentUser(req, res) {
  return res.json(req.user);
}

function addUser(req, res) {
  const {errors, isValid} = validateUserRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
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
              .catch(error => res.status(404).json(error));
          });
        });
      }
    })
    .catch(error => res.status(404).json(error));
}

function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const {errors, isValid} = validateUserLoginInput({email, password});

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = "Email not found!";
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          jwt.sign(payload, process.env.SECRET_JWT_TOKEN, {expiresIn: 3600}, (error, token) => (
            res.json({
              success: true,
              token: "Bearer " + token
            })
          ));
        } else {
          errors.password = "Password or email is invalid!";
          return res.status(404).json(errors);
        }
      });
    })
    .catch(error => res.status(404).json(error));
}

function deleteUser(req, res) {
  const errors = {};
  User.findOneAndRemove({_id: req.user.id})
    .then((profile) => {
      if (!profile) {
        errors.profile = "There is no user with given id in database!";
        return res.status(404).json(errors);
      }
      Profile.findOneAndRemove({user: req.user.id})
        .then(() => res.json({userWasDeleted: true}))
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
}

module.exports = {
  getCurrentUser: getCurrentUser,
  addUser: addUser,
  loginUser: loginUser,
  deleteUser: deleteUser
};
