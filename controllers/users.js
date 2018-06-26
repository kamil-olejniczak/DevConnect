const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");
const validateUserRegisterInput = require("../validation/register");
const validateUserLoginInput = require("../validation/login");

function getCurrentUser(req, res) {
  res.json(req.user);
}

async function addUser(req, res) {
  const {errors, isValid} = validateUserRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({email: req.body.email});
  if (user) {
    errors.email = "Email already in use!";
    res.status(400).json(errors);
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
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        if (error) throw error;
        newUser.password = hash;
        const savedUser = await newUser.save();
        res.json(savedUser);
      });
    });
  }
}

async function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const {errors, isValid} = validateUserLoginInput({email, password});

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({email});
  if (!user) {
    errors.email = "Email not found!";
    return res.status(404).json(errors);
  }

  const isMatch = await bcrypt.compare(password, user.password);
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
    res.status(404).json(errors);
  }
}

async function deleteUser(req, res) {
  const errors = {};
  const profile = await User.findOneAndRemove({_id: req.user.id});
  if (!profile) {
    errors.profile = "There is no user with given id in database!";
    return res.status(404).json(errors);
  }
  await Profile.findOneAndRemove({user: req.user.id});
  res.json({userWasDeleted: true});
}

module.exports = {
  getCurrentUser: getCurrentUser,
  addUser: addUser,
  loginUser: loginUser,
  deleteUser: deleteUser
};
