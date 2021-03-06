import React, {Component} from 'react';
import {initGetProfile, initRemoveProfile} from '../../store/actions/profile';
import Spinner from '../layout/Spinner';
import ProfileActions from './ProfileActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';
import isEmpty from '../../utils/emptyObjectValidator';

class Dashboard extends Component {
  componentDidMount() {
    this.props.initGetProfile();
  }

  onDeleteClick = () => {
    this.props.initRemoveProfile(this.props.history);
  };

  render() {
    const {user} = this.props;
    const {profile} = this.props.profile;
    const {isDataLoading} = this.props.common;
    const {errors} = this.props;

    let dashboardContent;
    if ((isDataLoading  && isEmpty(profile)) || (isEmpty(profile) && isEmpty(errors))) {
      dashboardContent = (<Spinner/>);
    } else if (profile.userWithoutProfile || errors.serverStatus) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          {errors.serverStatus ? (<p className="lead text-muted">{errors.serverStatus}</p>) :
            (<div>
              <p>Currently you did not setup a profile yet, please add some information about you.</p>
              <Link className="btn btn-md btn-info" to="/create-profile">Click here to create a new profile!</Link>
            </div>)}
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/developers/handle/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions/>
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          <div className="mt-4">
            <button className="btn btn-danger" type="button" onClick={this.onDeleteClick}>
              Delete My Account
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  initGetProfile: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    common: state.common,
    errors: state.errors,
    profile: state.profile,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetProfile: () => dispatch(initGetProfile()),
    initRemoveProfile: (history) => dispatch(initRemoveProfile(history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);