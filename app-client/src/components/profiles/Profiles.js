import React, {Component} from 'react';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {initGetProfiles} from '../../store/actions/profile';
import ProfileItem from './ProfileItem';
import isEmpty from '../../utils/emptyObjectValidator';

class Profiles extends Component {
  componentDidMount() {
    this.props.initGetProfiles();
  }

  render() {
    const {profiles} = this.props.profile;
    const {errors} = this.props;
    const {isDataLoading} = this.props.common;
    let renderedProfiles;

    if (isDataLoading || (isEmpty(profiles) && isEmpty(errors))) {
      renderedProfiles = (<Spinner/>);
    } else if (!isDataLoading && !profiles.profilesNotFound && !errors.serverStatus) {
      renderedProfiles = (profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>)));
    } else if (profiles.profilesNotFound || errors.serverStatus) {
      renderedProfiles = errors.serverStatus ? (<p className="lead text-muted">{errors.serverStatus}</p>) : (
        <div>
          <p className="lead text-muted">Currently there are no profiles in database. Feel free to add yours!</p>
        </div>);
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Find the most appropriate developer for your task
              </p>
              {renderedProfiles}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  initGetProfiles: PropTypes.func.isRequired,
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
    initGetProfiles: () => dispatch(initGetProfiles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);