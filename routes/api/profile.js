const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const validateUserProfileInput = require("../../validation/profile");
const validateUserExperienceInput = require("../../validation/experience");
const validateUserEducationInput = require("../../validation/education");

/**
 * @route GET api/profile
 * @desc Gets current user profile
 * @access Private
 **/
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.profile = "Profile not found for current user!";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(error => res.status(404).json(error));
});

/**
 * @route GET api/profile/handle/:handle
 * @desc Returns profile based on handle
 * @access Public
 **/
router.get("/handle/:handle", (req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.profile = "Profile not found for this handle!";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(error => res.status(404).json(error));
});

/**
 * @route GET api/profile/user/:user_id
 * @desc Returns profile based on user id
 * @access Public
 **/
router.get("/user/:user_id", (req, res) => {
    const errors = {};
    if (!req.params.user_id.match(/^[0-9a-fA-F]{24}$/)) {
        errors.id = "Given id is not proper!";
        return res.status(404).json(errors);
    }
    Profile.findOne({user: req.params.user_id})
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.profile = "Profile not found for this user!";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(error => res.status(404).json(error));
});

/**
 * @route GET api/profile/all
 * @desc Returns all profiles
 * @access Public
 **/
router.get("/all", (req, res) => {
    const errors = {};
    Profile.find()
        .populate("user", ["name", "avatar"])
        .then(profiles => {
            if (!profiles) {
                errors.profile = "There are no profiles in database!";
                return res.status(404).json(errors);
            }
            return res.json(profiles);
        })
        .catch(error => res.status(404).json(error));
});

/**
 * @route POST api/profile
 * @desc Posts new profile for current user
 * @access Private
 **/
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isValid} = validateUserProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = prepareRequestToCreateOrUpdateProfile(req);

    Profile.findOne({user: req.user.id}).then(profile => {
        if (profile) {
            errors.profile = "For user updates please use PUT request!";
            return res.status(404).json(errors);
        } else {
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if (profile) {
                    errors.handle = "That handle already exists!";
                    return res.status(404).json(errors);
                }
                return new Profile(profileFields).save()
                    .then(savedProfile => res.json(savedProfile));
            });
        }
    });
});

/**
 * @route POST api/profile/experience
 * @desc Adds new experience to user profile
 * @access Private
 **/
router.post('/experience', passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isValid} = validateUserExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newExperience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            profile.experience.unshift(newExperience);
            profile.save()
                .then(profile => res.json(profile));
        })
});

/**
 * @route POST api/profile/education
 * @desc Adds new education to user profile
 * @access Private
 **/
router.post('/education', passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isValid} = validateUserEducationInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            profile.education.unshift(newEducation);
            profile.save()
                .then(profile => res.json(profile));
        })
});

/**
 * @route PUT api/profile
 * @desc Updates profile for current user
 * @access Private
 **/

router.put("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isValid} = validateUserProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = prepareRequestToCreateOrUpdateProfile(req);

    Profile.findOne({user: req.user.id}).then(profile => {
        if (profile) {
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}).then(profile =>
                res.json(profile));
        } else {
            errors.profile = "For create new user please use POST request!";
            return res.status(404).json(errors);
        }
    });
});

/**
 * @route DELETE api/profile/experience/:experience_id
 * @desc Deletes experience from user profile
 * @access Private
 **/
router.delete('/experience/:experience_id', passport.authenticate("jwt", {session: false}), (req, res) => {
    const errors = {};
    if (!req.params.experience_id.match(/^[0-9a-fA-F]{24}$/)) {
        errors.id = "Given id is not proper!";
        return res.status(404).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const indexToBeRemoved = profile.experience
                .map(experience => experience.id)
                .indexOf(req.params.experience_id);

            if (indexToBeRemoved < 0) {
                errors.experience = "There is no experience with given id in database!";
                return res.status(404).json(errors);
            }

            profile.experience.splice(indexToBeRemoved, 1);

            profile.save()
                .then(profile => res.json(profile))
                .catch(error => res.status(404).json(error))
        });
});

/**
 * @route DELETE api/profile/education/:education_id
 * @desc Deletes education from user profile
 * @access Private
 **/
router.delete('/education/:education_id', passport.authenticate("jwt", {session: false}), (req, res) => {
    const errors = {};
    if (!req.params.education_id.match(/^[0-9a-fA-F]{24}$/)) {
        errors.id = "Given id is not proper!";
        return res.status(404).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const indexToBeRemoved = profile.education
                .map(education => education.id)
                .indexOf(req.params.education_id);

            if (indexToBeRemoved < 0) {
                errors.education = "There is no education with given id in database!";
                return res.status(404).json(errors);
            }

            profile.education.splice(indexToBeRemoved, 1);

            profile.save()
                .then(profile => res.json(profile))
                .catch(error => res.status(404).json(error))
        });
});

/**
 * @route DELETE api/profile
 * @desc Deletes profile from user
 * @access Private
 **/
router.delete('/', passport.authenticate("jwt", {session: false}), (req, res) => {
    const errors = {};
    Profile.findOneAndRemove({user: req.user.id})
        .then((profile) => {
            if (!profile) {
                errors.profile = "There is no profile with given id in database!";
                return res.status(404).json(errors);
            }
            User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({wasUserDeleted: true}))
        });
});

const prepareRequestToCreateOrUpdateProfile = (req) => {
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (typeof req.body.skills !== "undefined") profileFields.skills = req.body.skills.split(",");
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.gitHubUsername) profileFields.gitHubUsername = req.body.gitHubUsername;

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    return profileFields;
};

module.exports = router;
