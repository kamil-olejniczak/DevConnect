import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {initRemoveExperience} from '../../store/actions/profile';
import PropTypes from 'prop-types';

class Experience extends Component {
  onRemoveClick = (id) => {
    this.props.initRemoveExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          {' - '}
          {exp.to === undefined ? 'Current job' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onRemoveClick(exp._id)}
            disabled={this.props.isDataLoading}>Delete
          </button>
        </td>
      </tr>
    ));
    const errorKeys = Object.keys(this.props.errors);
    let errorMessages = errorKeys.length !== 0 ? (
      errorKeys.map(key => (
        <div className="alert alert-danger" role="alert">
          {this.props.errors[key]}
        </div>
      ))) : null;
    return (
      this.props.experience.length !== 0 ? (
        <div>
          {errorMessages}
          <h4 className="mb-4">Experience</h4>
          <table className="table">
            <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {experience}
            </tbody>
          </table>
        </div>
      ) : <p className="lead text-muted">You have no experience added. Feel free to add something!</p>
    )
  }
}

Experience.propTypes = {
  initRemoveExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isDataLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    isDataLoading: state.common.isDataLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initRemoveExperience: (experienceId) => dispatch(initRemoveExperience(experienceId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Experience);