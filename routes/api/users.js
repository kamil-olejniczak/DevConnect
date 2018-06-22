const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require('../../controllers/users');

/**
 * @route GET api/users/current
 * @desc Returns current user
 * @access Private
 **/
router.get("/current", passport.authenticate("jwt", {session: false}), usersController.getCurrentUser);

/**
 * @route POST api/users/register
 * @desc Registers user
 * @access Public
 **/
router.post("/register", usersController.addUser);

/**
 * @route POST api/users/login
 * @desc Returns JSON Web Token to login user
 * @access Public
 **/
router.post("/login", usersController.loginUser);

/**
 * @route DELETE api/users/
 * @desc Deletes user along with profile
 * @access Private
 **/
router.delete('/', passport.authenticate("jwt", {session: false}), usersController.deleteUser);

module.exports = router;
