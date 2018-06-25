import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {initRemoveEducation} from '../../store/actions/profile';

class Education extends Component {
  onRemoveClick = (id) => {
    this.props.initRemoveEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {' - '}
          {edu.to === undefined ? 'Currently learning' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onRemoveClick(edu._id)}
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
      this.props.education.length !== 0 ? (
        <div>
          {errorMessages}
          <h4 className="mb-4">Education</h4>
          <table className="table">
            <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {education}
            </tbody>
          </table>
        </div>
      ) : <p className="lead text-muted">You have no education added. Feel free to add something!</p>
    )
  }
}

Education.propTypes = {
  initRemoveEducation: PropTypes.func.isRequired,
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
    initRemoveEducation: (educationId) => dispatch(initRemoveEducation(educationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);