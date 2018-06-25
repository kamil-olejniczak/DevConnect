import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initGetProfileByHandle, initGetProfileById} from '../../store/actions/profile';
import isEmpty from '../../utils/emptyObjectValidator';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import ProfileHeader from './elements/ProfileHeader';
import ProfileAbout from './elements/ProfileAbout';
import ProfileCredentials from './elements/ProfileCredentials';
import ProfileGitHub from './elements/ProfileGitHub';
import {isPathForGetUserByHandle, isPathForGetUserById} from '../../utils/utils';

class DeveloperProfile extends Component {
  componentDidMount() {
    const {pathname} = this.props.history.location;
    if (isPathForGetUserByHandle(pathname)) {
      this.props.initGetProfileByHandle(this.props.match.params.handle);
    } else if (isPathForGetUserById(pathname)) {
      this.props.initGetProfileById(this.props.match.params.id);
    }
  }

  render() {
    const {profile} = this.props.profile;
    const {errors} = this.props;
    const {isDataLoading} = this.props.common;
    let renderedProfile;

    if (isDataLoading || isEmpty(profile)) {
      renderedProfile = (<Spinner/>);
    } else if (profile.profileNotFound || errors.serverStatus) {
      renderedProfile = errors.serverStatus ? (<p className="lead text-muted">{errors.serverStatus}</p>) : (
        <div>
          <p className="lead text-muted">There is no profile with that handle in database.</p>
        </div>
      );
    } else {
      renderedProfile = (
        <div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout profile={profile}/>
          <ProfileCredentials education={profile.education} experience={profile.experience}/>
          {profile.gitHubUsername ? <ProfileGitHub gitHubUsername={profile.gitHubUsername}/> : null}
        </div>
      );
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link className="btn btn-light" to="/developers">
                Go Back To Profiles
              </Link>
              <h1 className="display-4 text-center">Developer Profile</h1>
              <p className="lead text-center">
                Find the most appropriate developer for your task
              </p>
              {renderedProfile}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DeveloperProfile.propTypes = {
  initGetProfileByHandle: PropTypes.func.isRequired,
  initGetProfileById: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    common: state.common,
    errors: state.errors,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetProfileByHandle: (handle) => dispatch(initGetProfileByHandle(handle)),
    initGetProfileById: (id) => dispatch(initGetProfileById(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperProfile);