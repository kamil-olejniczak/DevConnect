import React, {Component} from 'react';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {initGetProfiles} from '../../store/actions/profile';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.initGetProfiles();
  }

  render() {
    const {profiles, isDataLoading} = this.props.profile;
    let renderedProfiles;

    if (isDataLoading || profiles.length === 0) {
      renderedProfiles = (<Spinner/>);
    } else if (!isDataLoading && !profiles.userWithoutProfiles) {
      renderedProfiles = (profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>)));
    } else if (profiles.userWithoutProfiles) {
      renderedProfiles = (
        <div>
          <p className="lead text-muted">Currently there are no profiles in database.</p>
        </div>
      );
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
    initGetProfiles: () => dispatch(initGetProfiles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);