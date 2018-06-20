import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/emptyObjectValidator';

class ProfileAbout extends Component {
  render() {
    const {profile} = this.props;
    const developerSkills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-caret-right"></i> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{profile.user.name +'\'s Bio'}</h3>
            <p className="lead mb-0">{!isEmpty(profile.bio) ? 'Developer without bio.' : profile.company}</p>
            <hr/>
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row justify-content-center">
              <div className="d-flex flex-wrap align-items-center">
                {developerSkills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;