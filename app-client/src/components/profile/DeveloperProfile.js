import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initGetProfileByHandle} from '../../store/actions/profile';
import isEmpty from '../../utils/emptyObjectValidator';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import ProfileHeader from './elements/ProfileHeader';
import ProfileAbout from './elements/ProfileAbout';
import ProfileCredentials from './elements/ProfileCredentials';
import ProfileGitHub from './elements/ProfileGitHub';

class DeveloperProfile extends Component {
  componentDidMount() {
    this.props.initGetProfileByHandle(this.props.match.params.handle);
  }

  render() {
    const {profile, isDataLoading} = this.props.profile;
    let renderedProfile;

    if (isDataLoading || isEmpty(profile)) {
      renderedProfile = (<Spinner/>);
    } else if (!isDataLoading && !profile.handleNotFound) {
      renderedProfile = (
        <div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout profile={profile}/>
          <ProfileCredentials education={profile.education} experience={profile.experience}/>
          {profile.gitHubUsername ? <ProfileGitHub gitHubUsername={profile.gitHubUsername}/> : null}
        </div>
      );
    } else if (profile.handleNotFound) {
      renderedProfile = (
        <div>
          <p className="lead text-muted">There is no profile with that handle in database.</p>
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
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetProfileByHandle: (handle) => dispatch(initGetProfileByHandle(handle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperProfile);