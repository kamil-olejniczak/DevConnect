import React, {Component} from 'react';
import isEmpty from '../../../utils/emptyObjectValidator';
import PropTypes from 'prop-types'
import Moment from 'react-moment';

class ProfileCredentials extends Component {
  render() {
    const {education, experience} = this.props;

    const developerExperience = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p><strong>Position: </strong>{exp.title}</p>
        <p><strong>Location: </strong>{isEmpty(exp.location) ? 'Unknown location' : exp.location}</p>
        <p><strong>Description: </strong>{isEmpty(exp.description) ? 'No description provided.' : exp.description}</p>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          {' - '}
          {exp.to === undefined ? 'Current job' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </p>
      </li>
    ));
    const developerEducation = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field of study: </strong>{isEmpty(edu.fieldOfStudy) ? 'Unknown field of study' : edu.fieldOfStudy}
        </p>
        <p><strong>Description: </strong>{isEmpty(edu.description) ? 'No description provided.' : edu.description}</p>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {' - '}
          {edu.to === undefined ? 'Currently learning' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-lg-6 pr-1">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Experience</h3>
            {developerExperience.length > 0 ? (
              <ul className="list-group">
                {developerExperience}
              </ul>
            ) : <p className="text-center mb-0">Developer has no experience listed.</p>}
          </div>
        </div>
        <div className="col-lg-6 pl-1">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Education</h3>
            {developerEducation.length > 0 ? (
              <ul className="list-group">
                {developerEducation}
              </ul>
            ) : <p className="text-center mb-0">Developer has no education listed.</p>}
          </div>
        </div>
      </div>
    );
  }
}

ProfileCredentials.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};

export default ProfileCredentials;