const User = require("../models/User");
const Profile = require("../models/Profile");
const validateUserProfileInput = require("../validation/profile");
const validateUserExperienceInput = require("../validation/experience");
const validateUserEducationInput = require("../validation/education");

async function getCurrentProfile(req, res) {
  const errors = {};
  const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]);
  if (!profile) {
    errors.profile = "Profile not found for current user!";
    return res.status(404).json(errors);
  }
  res.json(profile);
}

async function findProfileByHandle(req, res) {
  const errors = {};
  const profile = await Profile.findOne({handle: req.params.handle}).populate("user", ["name", "avatar"]);
  if (!profile) {
    errors.handle = "Profile not found for this handle!";
    return res.status(404).json(errors);
  }
  res.json(profile);
}

async function findProfileByUserId(req, res) {
  const errors = {};
  if (!req.params.user_id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name", "avatar"]);
  if (!profile) {
    errors.profile = "Profile not found for this user!";
    return res.status(404).json(errors);
  }
  res.json(profile);
}

async function getProfiles(req, res) {
  const errors = {};
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (profiles.length === 0) {
    errors.profile = "There are no profiles in database!";
    return res.status(404).json(errors);
  }
  res.json(profiles);
}

async function addProfile(req, res) {
  const {errors, isValid} = validateUserProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = prepareRequestToCreateOrUpdateProfile(req);

  const profile = await Profile.findOne({user: req.user.id});
  if (profile) {
    errors.profile = "For user updates please use PUT request!";
    res.status(404).json(errors);
  } else {
    const profile = await Profile.findOne({handle: profileFields.handle});
    if (profile) {
      errors.handle = "That handle already exists!";
      return res.status(404).json(errors);
    }
    const savedProfile = await new Profile(profileFields).save();
    res.json(savedProfile);
  }
}

async function addExperience(req, res) {
  const {errors, isValid} = validateUserExperienceInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profile = await Profile.findOne({user: req.user.id});
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
  const updatedProfile = await profile.save();
  res.json(updatedProfile);
}

async function addEducation(req, res) {
  const {errors, isValid} = validateUserEducationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profile = await Profile.findOne({user: req.user.id});
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
  const savedProfile = await profile.save();
  res.json(savedProfile);
}

async function updateProfile(req, res) {
  const {errors, isValid} = validateUserProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = prepareRequestToCreateOrUpdateProfile(req);

  const profile = await Profile.findOne({user: req.user.id});
  if (profile) {
    const profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
    res.json(profile);
  } else {
    errors.profile = "For create new user please use POST request!";
    res.status(404).json(errors);
  }
}

async function deleteExperienceById(req, res) {
  const errors = {};
  if (!req.params.experience_id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const profile = await Profile.findOne({user: req.user.id});
  const indexToBeRemoved = profile.experience
    .map(experience => experience.id)
    .indexOf(req.params.experience_id);

  if (indexToBeRemoved < 0) {
    errors.experience = "There is no experience with given id in database!";
    return res.status(404).json(errors);
  }

  profile.experience.splice(indexToBeRemoved, 1);

  const savedProfile = await profile.save();
  res.json(savedProfile);
}

async function deleteEducationById(req, res) {
  const errors = {};
  if (!req.params.education_id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const profile = await Profile.findOne({user: req.user.id});
  const indexToBeRemoved = profile.education
    .map(education => education.id)
    .indexOf(req.params.education_id);

  if (indexToBeRemoved < 0) {
    errors.education = "There is no education with given id in database!";
    return res.status(404).json(errors);
  }

  profile.education.splice(indexToBeRemoved, 1);

  const savedProfile = await profile.save();
  res.json(savedProfile);
}

async function deleteProfile(req, res) {
  const errors = {};
  const profile = await Profile.findOneAndRemove({user: req.user.id});
  if (!profile) {
    errors.profile = "There is no profile with given id in database!";
    return res.status(404).json(errors);
  }
  await User.findOneAndRemove({_id: req.user.id});
  res.json({userWasDeleted: true});
}

function prepareRequestToCreateOrUpdateProfile(req) {
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
}

module.exports = {
  getCurrentProfile: getCurrentProfile,
  findProfileByHandle: findProfileByHandle,
  findProfileByUserId: findProfileByUserId,
  getProfiles: getProfiles,
  addProfile: addProfile,
  addExperience: addExperience,
  addEducation: addEducation,
  updateProfile: updateProfile,
  deleteExperienceById: deleteExperienceById,
  deleteEducationById: deleteEducationById,
  deleteProfile: deleteProfile
};
