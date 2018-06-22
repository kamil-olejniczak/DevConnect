import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputFieldGroup from '../common/form/InputFieldGroup';
import SelectGroup from '../common/form/SelectGroup';
import TextAreaFieldGroup from '../common/form/TextAreaFieldGroup';
import InputGroup from '../common/form/InputGroup';
import {initCreateProfile, initGetProfile, initUpdateProfile} from '../../store/actions/profile';
import isEmpty from '../../utils/emptyObjectValidator';
import * as errorActions from '../../store/actions/error';
import {extractProfileDataFromResponse, isPathForCreateProfile, isPathForEditProfile} from '../../utils/utils';

class CreateProfile extends Component {
  state = {
    shouldDisplaySocialInputs: false,
    isDataToEdit: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    gitHubUsername: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  };

  componentDidMount() {
    this.props.cleanUpErrors();
    this.props.initGetProfile();
    if (isPathForEditProfile(this.props.history.location.pathname)) {
      this.setState({isDataToEdit: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps.profile;
    const {pathname} = this.props.history.location;

    if (profile.userWithoutProfile && isPathForEditProfile(pathname)) {
      this.props.history.push('/create-profile');
    } else if (profile.handle && isPathForCreateProfile(pathname)) {
      this.props.history.push('/edit-profile');
    } else if (!isEmpty(profile) && !profile.userWithoutProfile && !this.state.isDataToEdit) {
      let formattedUserData = extractProfileDataFromResponse(profile);
      this.setState(() => ({...formattedUserData}));
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const profileData = {...this.state};
    delete profileData['shouldDisplaySocialInputs'];
    delete profileData['isDataToEdit'];

    if (isPathForEditProfile(this.props.history.location.pathname)) {
      this.props.initUpdateProfile(profileData, this.props.history);
    } else {
      this.props.initCreateProfile(profileData, this.props.history);
    }
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSocialButtonClick = () => {
    this.setState((prevState) => ({shouldDisplaySocialInputs: !prevState.shouldDisplaySocialInputs}));
  };

  render() {
    const {errors} = this.props;

    const options = [
      {label: "* Select Your Status", value: ''},
      {label: "Student or still learning", value: "Student or still learning"},
      {label: "Intern", value: "Intern"},
      {label: "Instructor or Teacher", value: "Instructor or Teacher"},
      {label: "Junior Developer", value: "Junior Developer"},
      {label: "Developer", value: "Developer"},
      {label: "Senior Developer", value: "Senior Developer"},
      {label: "Manager", value: "Manager"},
      {label: "Other", value: "Other"},
    ];

    let socialInputs;
    if (this.state.shouldDisplaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            error={errors.youtube}
            icon="fab fa-youtube"
            name="youtube"
            onChange={this.onChange}
            placeholder="Youtube account"
            value={this.state.youtube}/>
          <InputGroup
            error={errors.twitter}
            icon="fab fa-twitter"
            name="twitter"
            onChange={this.onChange}
            placeholder="Twitter account"
            value={this.state.twitter}/>
          <InputGroup
            error={errors.facebook}
            icon="fab fa-facebook"
            name="facebook"
            onChange={this.onChange}
            placeholder="Facebook account"
            value={this.state.facebook}/>
          <InputGroup
            error={errors.linkedin}
            icon="fab fa-linkedin"
            name="linkedin"
            onChange={this.onChange}
            placeholder="LinkedIn account"
            value={this.state.linkedin}/>
          <InputGroup
            error={errors.instagram}
            icon="fab fa-instagram"
            name="instagram"
            onChange={this.onChange}
            placeholder="Instagram account"
            value={this.state.instagram}/>
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-light" to="/dashboard">Go Back</Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Make your profile shiny!</p>
              <small className="d-block pb-3">* = field marked with star is required</small>
              <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                  disabled={isPathForEditProfile(this.props.history.location.pathname)}
                  error={errors.handle}
                  info="A unique handle for your profile URL. You can use your full name, company
                    name, nickname, etc. (Please be careful, handle can't be changed, once it's created)."
                  name="handle"
                  onChange={this.onChange}
                  placeholder="* Profile handle"
                  required={true}
                  value={this.state.handle}/>
                <SelectGroup
                  error={errors.status}
                  info="Give us an idea of where you are at in your career."
                  name="status"
                  onChange={this.onChange}
                  options={options}
                  value={this.state.status}/>
                <InputFieldGroup
                  error={errors.company}
                  info="Company you work for, or your company."
                  name="company"
                  onChange={this.onChange}
                  placeholder="Company"
                  value={this.state.company}/>
                <InputFieldGroup
                  error={errors.website}
                  info="Your website."
                  name="website"
                  onChange={this.onChange}
                  placeholder="Website"
                  value={this.state.website}/>
                <InputFieldGroup
                  error={errors.location}
                  info="State and city."
                  name="location"
                  onChange={this.onChange}
                  placeholder="Location"
                  value={this.state.location}/>
                <InputFieldGroup
                  error={errors.skills}
                  info="Please separate data only with commas, without spaces (i.e. CSS,Java,JavaScript)."
                  name="skills"
                  onChange={this.onChange}
                  placeholder="* Skills"
                  value={this.state.skills}/>
                <InputFieldGroup
                  error={errors.gitHubUsername}
                  info="Your repo."
                  name="gitHubUsername"
                  onChange={this.onChange}
                  placeholder="Github Username"
                  value={this.state.gitHubUsername}/>
                <TextAreaFieldGroup
                  error={errors.bio}
                  info="Tell us a little bit about yourself."
                  name="bio"
                  onChange={this.onChange}
                  placeholder="A short bio of yourself"
                  value={this.state.bio}/>
                <div className="mb-3">
                  <button className="btn btn-light" type="button" onClick={this.onSocialButtonClick}>
                    {this.state.shouldDisplaySocialInputs ? 'Hide Social Network Links' : 'Add Social Network Links'}
                  </button>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={this.props.profile.isDataLoading}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  initGetProfile: PropTypes.func.isRequired,
  initCreateProfile: PropTypes.func.isRequired,
  initUpdateProfile: PropTypes.func.isRequired,
  cleanUpErrors: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetProfile: (payload, history) => dispatch(initGetProfile(payload, history)),
    initCreateProfile: (payload, history) => dispatch(initCreateProfile(payload, history)),
    initUpdateProfile: (payload, history) => dispatch(initUpdateProfile(payload, history)),
    cleanUpErrors: () => dispatch(errorActions.cleanUpErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);