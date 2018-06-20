import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../utils/emptyObjectValidator';

class Profiles extends Component {
  render() {
    const {profile} = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src={profile.user.avatar}
              alt="User avatar"
              title="Avatar generated by Gravatar"/>
          </div>
          <div className="col-lg-4 col-md-6 col-8">
            <h3>{profile.user.name}</h3>
            <p>{profile.status} {isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
            <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
            <Link className="btn btn-info" to={`/developers/${profile.handle}`}>View developer profile</Link>
          </div>
          <div className="cold-md-4 d-none d-md-block">
            <h4>Developer skill set:</h4>
            <ul className="list-group">
              {profile.skills.slice(0,3).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-caret-right" />
                  {' ' + skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profiles;